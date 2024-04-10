import { useValue } from '@cmpd/state'
import { TLShapeId } from '@cmpd/tlschema'
import { useEditor } from './useEditor'

/** @public */
export function useIsEditing(shapeId: TLShapeId) {
	const editor = useEditor()
	return useValue('isEditing', () => editor.getEditingShapeId() === shapeId, [editor, shapeId])
}
