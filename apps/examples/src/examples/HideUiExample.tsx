import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function HideUiExample() {
	return (
		<div className="tldraw__editor">
			<Compound persistenceKey="hide-ui-example" hideUi />
		</div>
	)
}
