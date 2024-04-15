import { LANGUAGES, TLLanguage, useEditor } from '@cmpd/editor'

/** @internal */
export function useLanguages() {
	const editor = useEditor()
	return {
		languages: LANGUAGES as readonly TLLanguage[],
		currentLanguage: editor.user.getLocale(),
	}
}
