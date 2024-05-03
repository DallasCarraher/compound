import { Compound, TLUiEventHandler } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { useCallback, useState } from 'react'

export default function UiEventsExample() {
	const [uiEvents, setUiEvents] = useState<string[]>([])

	const handleUiEvent = useCallback<TLUiEventHandler>((name, data) => {
		setUiEvents((events) => [`${name} ${JSON.stringify(data)}`, ...events])
	}, [])

	return (
		<div className="compound__editor flex overflow-hidden">
			<div className="flex-[2]">
				<Compound onUiEvent={handleUiEvent} />
			</div>
			<div
				style={{
					padding: 8,
					background: '#eee',
					border: 'none',
					fontFamily: 'monospace',
					fontSize: 12,
					borderLeft: 'solid 2px #333',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'auto',
				}}
				className="flex-1"
			>
				{uiEvents.map((t, i) => (
					<div key={i}>{t}</div>
				))}
			</div>
		</div>
	)
}
