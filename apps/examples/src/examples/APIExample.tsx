import {
	Compound,
	DefaultColorStyle,
	Editor,
	TLGeoShape,
	TLShapePartial,
	createShapeId,
	useEditor,
} from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { useEffect } from 'react'
import { SmartWindow } from '../SmartWindow'

// The compound component shares its Editor instance via its onMount callback prop.

// The Editor instance is compound's "god object". You can use the app to do
// just about everything that's possible in compound. Internally, the canvas
// component and all shapes, tools, and UI components use this instance to
// send events, observe changes, and perform actions.

export default function APIExample() {
	const handleMount = (editor: Editor) => {
		// Create a shape id
		const id = createShapeId('hello')

		// Create a shape
		editor.createShapes<TLGeoShape>([
			{
				id,
				type: 'geo',
				x: 128 + Math.random() * 500,
				y: 128 + Math.random() * 500,
				props: {
					geo: 'rectangle',
					w: 100,
					h: 50,
					dash: 'draw',
					color: 'blue',
					size: 'm',
				},
			},
		])

		// Get the created shape
		const shape = editor.getShape<TLGeoShape>(id)!

		const shapeUpdate: TLShapePartial<TLGeoShape> = {
			id,
			type: 'geo',
			props: {
				h: shape.props.h * 3,
				text: 'hello world!',
			},
		}

		// Update the shape
		editor.updateShapes([shapeUpdate])

		// Select the shape
		editor.select(id)

		// Rotate the shape around its center
		editor.rotateShapesBy([id], Math.PI / 16)

		// Clear the selection
		editor.selectNone()

		// Zoom the camera to fit both shapes
		editor.zoomToFit()
	}

	return (
		<div className="compound__editor">
			<Compound persistenceKey="api-example" onMount={handleMount}>
				<InsideOfEditorContext />
				{/* Smart Windows */}
				<SmartWindow
					id="info__api-example"
					title="Editor API"
					iHeight={350}
					iWidth={300}
					upperBound={400}
					location={{
						x: '50px',
						y: '100px',
					}}
				>
					<p>
						The{' '}
						<strong>
							<code>{'<Compound />'}</code>
						</strong>{' '}
						component shares its Core Editor instance via its{' '}
						<strong>
							<code>onMount</code>
						</strong>{' '}
						callback prop.
					</p>
					<br />
					<p>
						The{' '}
						<b>
							<code>Editor</code>
						</b>{' '}
						instance is compound's{' '}
						<b>
							<i>god object</i>
						</b>
						. You can use the editor to do just about everything that's possible in compound.
						Internally, the canvas component, shapes, tools, and UI components use this instance to
						send events, observe changes, and perform actions.
					</p>
					<p>
						Another way to access the{' '}
						<b>
							<code>Editor</code>
						</b>{' '}
						instance is through React context. The Compound component provides the context, so you
						can add children to the component and access the instance through the{' '}
						<code>useEditor()</code> hook.
					</p>
				</SmartWindow>
				{/* <SmartWindow
					id="info__api-example-2"
					title="Editor API (cont.)"
					iHeight={200}
					iWidth={300}
					upperBound={300}
					location={{
						x: '100px',
						y: '600px',
					}}
				>
					Another way to access the{' '}
					<b>
						<code>Editor</code>
					</b>{' '}
					instance is through React context. The Compound component provides the context, so you can
					add children to the component and access the instance through the <code>useEditor()</code>{' '}
					hook.
				</SmartWindow> */}
			</Compound>
		</div>
	)
}

const InsideOfEditorContext = () => {
	const editor = useEditor()

	useEffect(() => {
		let i = 0

		const interval = setInterval(() => {
			const selection = [...editor.getSelectedShapeIds()]
			editor.selectAll()
			editor.setStyleForSelectedShapes(DefaultColorStyle, i % 2 ? 'blue' : 'light-blue')
			editor.setStyleForNextShapes(DefaultColorStyle, i % 2 ? 'blue' : 'light-blue')
			editor.setSelectedShapes(selection)
			i++
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [editor])

	return null
}
