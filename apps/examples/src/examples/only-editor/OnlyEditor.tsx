/* eslint-disable import/no-extraneous-dependencies */

import { Editor, PositionedOnCanvas, TldrawEditor, createShapeId, track } from '@cmpd/editor'
import '@cmpd/editor/editor.css'
import { MiniBoxShapeUtil } from './MiniBoxShape'
import { MiniSelectTool } from './MiniSelectTool'

const myTools = [MiniSelectTool]
const myShapeUtils = [MiniBoxShapeUtil]

export default function OnlyEditorExample() {
	return (
		<div className="compound__editor">
			<TldrawEditor
				tools={myTools}
				shapeUtils={myShapeUtils}
				initialState="select"
				onMount={(editor: Editor) => {
					editor
						.selectAll()
						.deleteShapes(editor.getSelectedShapeIds())
						.createShapes([
							{
								id: createShapeId(),
								type: 'box',
								x: 100,
								y: 100,
							},
						])
				}}
				components={{
					Background: BackgroundComponent,
				}}
			/>
		</div>
	)
}

/**
 * This one will move with the camera, just like shapes do.
 */
const BackgroundComponent = track(() => {
	return (
		<PositionedOnCanvas x={16} y={16}>
			<p>Double click to create shapes.</p>
			<p>Click or Shift+Click to select shapes.</p>
			<p>Click and drag to move shapes.</p>
		</PositionedOnCanvas>
	)
})
