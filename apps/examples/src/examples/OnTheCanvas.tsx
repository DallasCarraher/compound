import { SmartWindow } from '@/SmartWindow'
import {
	Compound,
	TLEditorComponents,
	stopEventPropagation,
	track,
	useEditor,
} from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { useState } from 'react'

// The "OnTheCanvas" component is rendered on top of the canvas, but behind the UI.
function MyComponent() {
	const [state, setState] = useState(0)

	return (
		<>
			<div
				style={{
					position: 'absolute',
					top: 50,
					left: 50,
					width: 'fit-content',
					padding: 12,
					borderRadius: 8,
					backgroundColor: 'yellowgreen',
					zIndex: 0,
					pointerEvents: 'all',
					userSelect: 'unset',
				}}
				onPointerDown={stopEventPropagation}
				onPointerMove={stopEventPropagation}
			>
				The count is {state}! <button onClick={() => setState((s) => s - 1)}>-1</button>
			</div>
			<div
				style={{
					position: 'absolute',
					top: 150,
					left: 150,
					width: 128,
					padding: 12,
					borderRadius: 8,
					backgroundColor: 'pink',
					zIndex: 99999999,
					pointerEvents: 'all',
					userSelect: 'unset',
				}}
				onPointerDown={stopEventPropagation}
				onPointerMove={stopEventPropagation}
			>
				The count is {state}! <button onClick={() => setState((s) => s + 1)}>+1</button>
			</div>
		</>
	)
}

// The "InFrontOfTheCanvas" component is rendered on top of the canvas, but behind the UI.
const MyComponentInFront = track(() => {
	const editor = useEditor()
	const selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds()

	if (!selectionRotatedPageBounds) return null

	const pageCoordinates = editor.pageToScreen(selectionRotatedPageBounds.point)

	return (
		<div
			style={{
				position: 'absolute',
				top: Math.max(64, pageCoordinates.y - 64),
				left: Math.max(64, pageCoordinates.x),
				padding: 12,
				background: '#efefef',
			}}
		>
			This does not scale with the zoom
		</div>
	)
})

const components: TLEditorComponents = {
	OnTheCanvas: MyComponent,
	InFrontOfTheCanvas: MyComponentInFront,
	SnapLine: null,
}

export default function OnTheCanvasExample() {
	return (
		<div className="compound__editor">
			<Compound persistenceKey="things-on-the-canvas-example" components={components}>
				<SmartWindow
					id="info__on-the-canvas-example"
					title="Things on the canvas!"
					iHeight={280}
					iWidth={300}
					lowerBound={200}
					upperBound={400}
					location={{
						x: '10px',
						y: '100px',
					}}
				>
					<p>This example demonstrates how to render custom components on the canvas.</p>
					<br />
					<p>
						The two "count" components are rendered <b>on the canvas</b>, but behind the UI. They
						are reactive; try clicking the +1 or -1 buttons within them.
					</p>
					<br />
					<p>
						The "This does not scale with the zoom" component can be seen by creating a new shape or
						selecting one. It is <b>rendered on top of the canvas</b>, but behind the UI.
					</p>
				</SmartWindow>
			</Compound>
		</div>
	)
}
