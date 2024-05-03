import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function ForceMobileExample() {
	return (
		<div className="compound__editor">
			<Compound persistenceKey="compound_example" forceMobile />
		</div>
	)
}
