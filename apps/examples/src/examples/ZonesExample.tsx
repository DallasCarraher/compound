import { Compound, OfflineIndicator } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function Example() {
	return (
		<div className="tldraw__editor">
			<Compound topZone={<OfflineIndicator />} shareZone={<CustomShareZone />} />
		</div>
	)
}

function CustomShareZone() {
	return (
		<div
			style={{
				backgroundColor: 'thistle',
				width: '100%',
				textAlign: 'center',
				minWidth: '80px',
			}}
		>
			<p>Share Zone</p>
		</div>
	)
}
