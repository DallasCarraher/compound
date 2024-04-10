import { Tldraw } from '@cmpd/compound'
import '@cmpd/compound/tldraw.css'

export default function BasicExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw persistenceKey="tldraw_example" />
		</div>
	)
}
