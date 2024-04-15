import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function BasicExample() {
	return (
		<div className="tldraw__editor">
			<Compound persistenceKey="tldraw_example" />
		</div>
	)
}
