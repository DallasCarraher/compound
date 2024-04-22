import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageDir = join(__dirname, '..')

let combinedContent = [
	join(packageDir, '..', 'editor', 'editor.css'),
	join(packageDir, 'src', 'lib', 'ui.css'),
].reduce(
	(acc, path) => {
		const content = readFileSync(path, 'utf8')
		acc += content + '\n'
		return acc
	},
	`/* THIS CSS FILE IS GENERATED! DO NOT EDIT. OR EDIT. I'M A COMMENT NOT A COP */ 
/* This file is created by the copy-css-files.mjs script in @cmpd/compound. */
/* It combines @cmpd/editor's editor.css and @cmpd/compound's ui.css */

`
)

const destination = join(packageDir, 'compound.css')
writeFileSync(destination, combinedContent)

console.log('compound.css updated! ✅')
