import { useEditor, useValue } from '@cmpd/editor'

/** @public */
export function useCanUndo() {
	const editor = useEditor()
	return useValue('useCanUndo', () => editor.getCanUndo(), [editor])
}
