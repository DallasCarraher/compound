import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { useState } from 'react'
import { SmartWindow } from '../SmartWindow'

export default function MetaExample() {
	const [shapeData, setShapeData] = useState({})

	return (
		<div className="compound__editor">
			<Compound
				persistenceKey="compound_example"
				onMount={(editor) => {
					// There's no API for setting getInitialMetaForShape yet, but
					// you can replace it at runtime like this. This will run for
					// all shapes created by the user.
					editor.getInitialMetaForShape = (_shape) => {
						return {
							createdBy: editor.user.getName(),
							createdAt: Date.now(),
							updatedBy: editor.user.getId(),
							updatedAt: Date.now(),
						}
					}
					// We can also use the sideEffects API to modify a shape before
					// its change is committed to the database. This will run for
					// all shapes whenever they are updated.
					editor.sideEffects.registerBeforeChangeHandler('shape', (_prev, next, source) => {
						if (source !== 'user') return next
						const change = {
							...next,
							meta: {
								...next.meta,
								updatedBy: editor.user.getId(),
								updatedAt: Date.now(),
							},
						}
						setShapeData(change)
						return change
					})
				}}
			>
				<SmartWindow
					id="info__meta-example"
					title="Meta Example"
					iHeight={400}
					upperBound={725}
					location={{
						x: '10px',
						y: '75px',
					}}
				>
					<p>
						This example shows how to add metadata to shapes. The metadata is updated whenever a
						shape is created or updated.
					</p>
					<p>
						You can see the metadata by creating and/or selecting a shape and looking at the "meta"
						property on its shape object.
					</p>
					<br />
					<p>
						<strong>Shape Data:</strong>
					</p>
					<pre>{JSON.stringify(shapeData, null, 2)}</pre>
				</SmartWindow>
			</Compound>
		</div>
	)
}
