import { execSync } from 'child_process'
import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'
import { log } from './lib/log'

// The path to your packages directory
const packagesDir = path.resolve(__dirname, '..', 'packages')
log(`Reading packages from ${packagesDir}`)

// Read the packages directory
const packages = fs.readdirSync(packagesDir)
log(`Found ${packages.length} packages`)
log(packages)

log('Adding latest tag to all packages...')
// For each package...
packages.forEach((packageName) => {
	// Get the package.json file
	const packageJsonPath = path.join(packagesDir, packageName, 'package.json')
	log(`Checking ${packageJsonPath}`)

	// If the package.json file exists...
	if (fs.existsSync(packageJsonPath)) {
		// Read the package.json file
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
		log(`Found package.json for ${packageName}`)

		// If the package.json file has a version field...
		if (packageJson.version) {
			// Run the npm dist-tag add command
			const command = `npm dist-tag add @cmpd/${packageName}@${packageJson.version} latest`
			execSync(command, { stdio: 'inherit' })
		}
	}
})
