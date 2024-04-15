import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function ReadOnlyExample() {
	return (
		<div className="tldraw__editor">
			<Compound
				persistenceKey="tldraw_example"
				onMount={(editor) => {
					editor.updateInstanceState({ isReadonly: true })
				}}
			/>
		</div>
	)
}
