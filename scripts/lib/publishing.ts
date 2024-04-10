import { execSync } from 'child_process'
import { fetch } from 'cross-fetch'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import path, { join } from 'path'
import { compare, parse } from 'semver'
import { exec } from './exec'
import { BUBLIC_ROOT } from './file'
import { nicelog } from './nicelog'

export type PackageDetails = {
	name: string
	dir: string
	localDeps: string[]
	version: string
}

function getPackageDetails(dir: string): PackageDetails | null {
	const packageJsonPath = path.join(dir, 'package.json')
	if (!existsSync(packageJsonPath)) {
		return null
	}
	const packageJson = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'))
	if (packageJson.private) {
		return null
	}
	return {
		name: packageJson.name,
		dir,
		version: packageJson.version,
		localDeps: Object.keys(packageJson.dependencies ?? {}).filter((dep) => dep.startsWith('@cmpd')),
	}
}

/**
 * Get all package details for all packages in the monorepo.
 * @returns A record of package names to package details
 */
export function getAllPackageDetails(): Record<string, PackageDetails> {
	const dirs = readdirSync(join(BUBLIC_ROOT, 'packages'))
	const results = dirs
		.map((dir) => getPackageDetails(path.join(BUBLIC_ROOT, 'packages', dir)))
		.filter((x): x is PackageDetails => Boolean(x))

	return Object.fromEntries(results.map((result) => [result.name, result]))
}

/**
 * Sets the version for all packages in the monorepo.
 * @param version The version to set for all packages in the monorepo
 */
export function setAllVersions(version: string) {
	const packages = getAllPackageDetails()
	for (const packageDetails of Object.values(packages)) {
		const manifest = JSON.parse(readFileSync(path.join(packageDetails.dir, 'package.json'), 'utf8'))
		manifest.version = version
		writeFileSync(
			path.join(packageDetails.dir, 'package.json'),
			JSON.stringify(manifest, null, '\t') + '\n'
		)
		if (manifest.name === '@cmpd/editor') {
			const versionFileContents = `export const version = '${version}'\n`
			writeFileSync(path.join(packageDetails.dir, 'src', 'version.ts'), versionFileContents)
		}
		if (manifest.name === '@cmpd/compound') {
			const versionFileContents = `export const version = '${version}'\n`
			writeFileSync(
				path.join(packageDetails.dir, 'src', 'lib', 'ui', 'version.ts'),
				versionFileContents
			)
		}
	}

	const lernaJson = JSON.parse(readFileSync('lerna.json', 'utf8'))
	lernaJson.version = version
	writeFileSync('lerna.json', JSON.stringify(lernaJson, null, '\t') + '\n')

	execSync('yarn')
}

export function getLatestVersion() {
	// Get all package details
	const packages = getAllPackageDetails()

	// Map each package to its version, parsed into a SemVer object
	const allVersions = Object.values(packages).map((p) => parse(p.version)!)

	// Sort the versions in ascending order
	allVersions.sort(compare)

	// Get the last version in the sorted array, which is the latest version
	const latestVersion = allVersions[allVersions.length - 1]

	// If there is no latest version, throw an error
	if (!latestVersion) throw new Error('Could not find latest version')

	// Return the latest version
	return latestVersion
}

/**
 * Sorts the packages in topological order.
 * @param packages A record of package names to package details
 * @returns An array of package details in topological order
 */
function topologicalSortPackages(packages: Record<string, PackageDetails>) {
	// Initialize an array to hold the sorted packages
	const sorted: PackageDetails[] = []
	// Initialize a set to keep track of visited packages
	const visited = new Set<string>()

	// Define a helper function to visit a package
	function visit(packageName: string, path: string[]) {
		// If the package has already been visited, return immediately
		if (visited.has(packageName)) {
			return
		}
		// Mark the package as visited
		visited.add(packageName)
		// Get the details of the package
		const packageDetails = packages[packageName]
		// If the package details could not be found, throw an error
		if (!packageDetails) {
			throw new Error(`Could not find package ${packageName}. path: ${path.join(' -> ')}`)
		}
		// Visit all dependencies of the package
		packageDetails.localDeps.forEach((dep) => visit(dep, [...path, dep]))
		// Add the package to the sorted array
		sorted.push(packageDetails)
	}

	// Visit all packages
	Object.keys(packages).forEach((packageName) => visit(packageName, [packageName]))

	// Return the sorted array of packages
	return sorted
}

/**
 * Publishes all packages in the monorepo to the NPM registry.
 * This function assumes that the NPM token is set in the NPM_TOKEN environment variable.
 * It also assumes that the packages are in the correct state and that the version has been bumped.
 * If the version has not been bumped, the packages will be published with the same version as the previous release.
 * If the version has been bumped, the packages will be published with the new version.
 */
export async function publish() {
	// Get the NPM token from the environment variables
	const npmToken = process.env.NPM_TOKEN
	if (!npmToken) throw new Error('NPM_TOKEN not set')

	// Set the NPM auth token and registry server using the execSync function
	execSync(`yarn config set npmAuthToken ${npmToken}`, { stdio: 'inherit' })
	execSync(`yarn config set npmRegistryServer https://registry.npmjs.org`, { stdio: 'inherit' })

	// Get all package details
	const packages = getAllPackageDetails()
	console.log('packages', packages)

	// Sort the packages in topological order
	const publishOrder = topologicalSortPackages(packages)
	console.log('publishOrder', publishOrder)

	// Loop through each package in the sorted order
	for (const packageDetails of publishOrder) {
		// Get the prerelease tag from the package version or set it to 'latest'
		const prereleaseTag = parse(packageDetails.version)?.prerelease[0] ?? 'latest'
		// Log the package name, version, and tag
		nicelog(
			`Publishing ${packageDetails.name} with version ${packageDetails.version} under tag @${prereleaseTag}`
		)

		// Try to publish the package, retrying up to 5 times with a delay of 10 seconds between each attempt
		await retry(
			async () => {
				let output = ''
				try {
					// Execute the yarn publish command
					await exec(
						`yarn`,
						[
							'npm',
							'publish',
							'--tag',
							String(prereleaseTag),
							'--tolerate-republish',
							'--access',
							'public',
						],
						{
							pwd: packageDetails.dir,
							processStdoutLine: (line) => {
								output += line + '\n'
								nicelog(line)
							},
							processStderrLine: (line) => {
								output += line + '\n'
								nicelog(line)
							},
						}
					)
				} catch (e) {
					// If the error is about publishing over previously published versions, ignore it
					if (output.includes('You cannot publish over the previously published versions')) {
						return
					}
					// Otherwise, throw the error
					throw e
				}
			},
			{
				delay: 10_000,
				numAttempts: 5,
			}
		)

		// Wait for the package to be published, retrying up to 10 times with a delay of 3 seconds between each attempt
		await retry(
			async ({ attempt, total }) => {
				// Log the attempt number
				nicelog('Waiting for package to be published... attempt', attempt, 'of', total)
				// Fetch the new package directly from the npm registry
				const newVersion = packageDetails.version
				const unscopedName = packageDetails.name.replace('@cmpd/', '')

				const url = `https://registry.npmjs.org/@cmpd/${unscopedName}/-/${unscopedName}-${newVersion}.tgz`
				nicelog('looking for package at url: ', url)
				const res = await fetch(url, {
					method: 'HEAD',
				})
				// If the package is not found, throw an error
				if (res.status >= 400) {
					throw new Error(`Package not found: ${res.status}`)
				}
			},
			{
				delay: 3000,
				numAttempts: 10,
			}
		)
	}
}

function retry(
	fn: (args: { attempt: number; remaining: number; total: number }) => Promise<void>,
	opts: {
		numAttempts: number
		delay: number
	}
): Promise<void> {
	return new Promise((resolve, reject) => {
		let attempts = 0
		function attempt() {
			fn({ attempt: attempts, remaining: opts.numAttempts - attempts, total: opts.numAttempts })
				.then(resolve)
				.catch((err) => {
					attempts++
					if (attempts >= opts.numAttempts) {
						reject(err)
					} else {
						setTimeout(attempt, opts.delay)
					}
				})
		}
		attempt()
	})
}
