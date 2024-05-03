import { SmartWindow } from '@/SmartWindow'
import { Compound, TLShape, track, useEditor } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function ShapeMetaExample() {
	return (
		<div className="compound__editor">
			<Compound
				persistenceKey="shape_meta_example"
				onMount={(editor) => {
					editor.getInitialMetaForShape = (shape) => {
						return { label: `My ${shape.type} shape` }
					}
				}}
			>
				<ShapeLabelUiWithHelper />
				<SmartWindow
					id="info__meta-shape-example"
					title='Typing "Meta"'
					iHeight={300}
					iWidth={300}
					upperBound={700}
					location={{
						x: '10px',
						y: '100px',
					}}
				>
					<p>By default, the TLShape type's meta property is:</p>
					<br />
					<pre>{'{ [key: string]: any }'}</pre>
					<br />
					<p>
						but we can type it by unioning the type with a new type that has a meta property of our
						choosing.
					</p>
					<br />
					<pre>{'type CustomShapeWithMeta = TLShape & \n { meta: { label: string } }'}</pre>
				</SmartWindow>
			</Compound>
		</div>
	)
}

// By default, the TLShape type's meta property is { [key: string]: any }, but we can type it
// by unioning the type with a new type that has a meta property of our choosing.
type ShapeWithMyMeta = TLShape & { meta: { label: string } }

export const ShapeLabelUiWithHelper = track(function ShapeLabelUiWithHelper() {
	const editor = useEditor()
	const onlySelectedShape = editor.getOnlySelectedShape() as ShapeWithMyMeta | null

	if (!onlySelectedShape) {
		return null
	}

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (onlySelectedShape) {
			const { id, type, meta } = onlySelectedShape

			editor.updateShapes<ShapeWithMyMeta>([
				{ id, type, meta: { ...meta, label: e.currentTarget.value } },
			])
		}
	}

	return (
		<div style={{ position: 'absolute', zIndex: 300, top: 64, left: 12 }}>
			shape label: <input value={onlySelectedShape.meta.label} onChange={onChange} />
		</div>
	)
})
