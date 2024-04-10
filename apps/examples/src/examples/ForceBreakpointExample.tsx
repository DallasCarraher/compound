import { Tldraw } from '@cmpd/compound'
import '@cmpd/compound/tldraw.css'

export default function ForceMobileExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw persistenceKey="tldraw_example" forceMobile />
		</div>
	)
}
