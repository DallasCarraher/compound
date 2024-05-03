import { Compound, useEditor } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
// import { useState } from 'react'

export default function Development() {
	// const [store] = useState(() => {
	// 	// Create the store
	// 	const newStore = createTLStore({
	// 		shapeUtils: defaultShapeUtils,
	// 	})

	// 	// Get the snapshot
	// 	const stringified = localStorage.getItem('my-editor-snapshot')
	// 	const snapshot = JSON.parse(stringified)

	// 	// Load the snapshot
	// 	newStore.loadSnapshot(snapshot)

	// 	return newStore
	// })

	return (
		<div className="compound__editor">
			<Compound persistenceKey="development">
				<Listener />
			</Compound>
		</div>
	)
}

function Listener() {
	const editor = useEditor()
	return (
		<button
			onClick={() => {
				const snapshot = editor.store.getSnapshot()
				// store the snapshot as a file on the user's computer
				const stringified = JSON.stringify(snapshot, null, 2)
				// console.log(stringified)
				localStorage.setItem('my-editor-snapshot', stringified)
			}}
			style={{
				position: 'absolute',
				top: 0,
				right: 0,
				padding: '8px',
				background: 'rgba(0, 0, 0, 0.5)',
				color: 'white',
				border: 'none',
				cursor: 'pointer',
				zIndex: 1000,
			}}
		>
			Save
		</button>
	)
}
