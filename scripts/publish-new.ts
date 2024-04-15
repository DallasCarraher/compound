import { Auto } from '@auto-it/core'
import 'dotenv/config'
import { parse } from 'semver'

import { exec } from './lib/exec'
import { BUBLIC_ROOT } from './lib/file'
import { log } from './lib/log'
import { getLatestVersion, publish, setAllVersions } from './lib/publishing'
import { getAllWorkspacePackages } from './lib/workspace'

/**
 * Publish a new version of the packages.
 */
async function main() {
	log('\n\n\n Publishing new version... \n\n\n')
	const auto = new Auto({
		plugins: ['npm'],
		baseBranch: 'osmain',
		owner: 'DallasCarraher',
		repo: 'compound',
		verbose: true,
	})
	log('\n\n\n auto created ⚙️ \n\n\n')

	// module was called directly
	const currentBranch = (await exec('git', ['rev-parse', '--abbrev-ref', 'HEAD'])).toString().trim()
	if (currentBranch !== 'osmain') throw new Error('Must be on the `osmain` branch to publish')

	await auto.loadConfig()
	log('\n\n\n auto config loaded 📄 \n\n\n')

	// bump the version
	const bump = await auto.getVersion()
	log('bump ===', bump)
	if (!bump) {
		log('nothing to do', bump)
		return
	}

	// get the latest version
	const latestVersion = parse(getLatestVersion())!
	log('latestVersion', latestVersion)

	const [prereleaseTag, prereleaseNumber] = latestVersion.prerelease
	if (prereleaseTag && typeof prereleaseNumber !== 'number') {
		throw new Error(`Invalid prerelease format in version ${latestVersion}, expected e.g. -alpha.1`)
	}

	// if we're in prerelease mode, don't bump the version, only the prerelease number
	const nextVersion = prereleaseTag
		? `${latestVersion.major}.${latestVersion.minor}.${latestVersion.patch}-${prereleaseTag}.${
				Number(prereleaseNumber) + 1
		  }`
		: latestVersion.inc(bump).format()

	setAllVersions(nextVersion)

	// stage the changes
	const packageJsonFilesToAdd = []
	for (const workspace of await getAllWorkspacePackages()) {
		if (workspace.relativePath.startsWith('packages/')) {
			packageJsonFilesToAdd.push(`${workspace.relativePath}/package.json`)
		}
	}

	log('packageJsonFilesToAdd', packageJsonFilesToAdd)

	return
	await exec('git', [
		'add',
		'lerna.json',
		...packageJsonFilesToAdd,
		BUBLIC_ROOT + '/packages/*/src/version.ts',
	])

	// this creates a new commit
	await auto.changelog({
		useVersion: nextVersion,
		title: `v${nextVersion}`,
	})

	// create and push a new tag
	await exec('git', ['tag', '-f', `v${nextVersion}`])
	await exec('git', ['push', '--follow-tags'])

	// create a release on github
	await auto.runRelease({ useVersion: nextVersion })

	// finally, publish the packages [IF THIS STEP FAILS, RUN THE `publish-manual.ts` script locally]
	await publish()

	// nicelog('Notifying huppy of release...')
	// const huppyResponse = await fetch('https://tldraw-repo-sync.fly.dev/api/on-release', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify({ apiKey: huppyToken, tagToRelease: `v${nextVersion}`, canary: false }),
	// })
	// nicelog(
	// 	`huppy: [${huppyResponse.status} ${huppyResponse.statusText}] ${await huppyResponse.text()}`
	// )
}

main()
