import { useValue } from '@cmpd/state'
import { TLShapeId } from '@cmpd/tlschema'
import { useEditor } from './useEditor'

/** @public */
export function useIsCropping(shapeId: TLShapeId) {
	const editor = useEditor()
	return useValue('isCropping', () => editor.getCroppingShapeId() === shapeId, [editor, shapeId])
}
