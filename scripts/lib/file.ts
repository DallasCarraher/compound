import { readFile, writeFile as writeFileUnchecked } from 'fs/promises'
import json5 from 'json5'
import { basename, dirname, join, relative } from 'path'
import prettier from 'prettier'
import { fileURLToPath } from 'url'
import { log } from './log'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const isBublic = basename(join(__dirname, '../..')) === 'bublic'
export const REPO_ROOT = join(__dirname, isBublic ? '../../../' : '../..')
export const BUBLIC_ROOT = join(__dirname, '../..')

export async function readJsonIfExists(file: string) {
	const fileContents = await readFileIfExists(file)
	if (fileContents === null) {
		return null
	}
	return json5.parse(fileContents)
}

export async function readFileIfExists(file: string) {
	try {
		return await readFile(file, 'utf8')
	} catch {
		return null
	}
}

const prettierConfigPromise = prettier.resolveConfig(__dirname)
export async function writeCodeFile(
	generator: string,
	language: 'typescript' | 'javascript',
	filePath: string,
	code: string
) {
	const formattedCode = prettier.format(
		`
		// This file is automatically generated by ${generator}.
		// Do not edit manually.

		${code}
	`,
		{
			...(await prettierConfigPromise),
			parser: language === 'typescript' ? 'typescript' : 'babel',
		}
	)
	await writeStringFile(filePath, formattedCode)
}

export async function writeStringFile(filePath: string, contents: string) {
	await writeFile(filePath, Buffer.from(contents, 'utf-8'))
}

export async function writeFile(filePath: string, contents: Buffer) {
	if (process.env.CI) {
		let existingContents: Buffer | null = null
		try {
			existingContents = await readFile(filePath)
		} catch {
			// Ignore
		}
		if (existingContents && !existingContents.equals(contents)) {
			log(
				`Asset file ${relative(
					REPO_ROOT,
					filePath
				)} has changed. Please run this script again and commit the changes.`
			)
			log('Contents before:')
			log(existingContents.toString('utf-8'))
			log('\nContents after:')
			log(contents.toString('utf-8'))

			process.exit(1)
		}
	}
	await writeFileUnchecked(filePath, contents, 'utf-8')
}

export async function writeJsonFile(filePath: string, contents: unknown) {
	const formattedJson = prettier.format(JSON.stringify(contents, null, '\t'), {
		...(await prettierConfigPromise),
		parser: 'json',
	})
	await writeStringFile(filePath, formattedJson)
}
