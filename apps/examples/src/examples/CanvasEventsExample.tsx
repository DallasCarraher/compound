import { Compound, TLEventInfo } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { useCallback, useState } from 'react'

export default function CanvasEventsExample() {
	const [events, setEvents] = useState<string[]>([])

	const handleEvent = useCallback((data: TLEventInfo) => {
		setEvents((events) => [JSON.stringify(data, null, 2), ...events.slice(0, 100)])
	}, [])

	return (
		<div className="compound__editor flex overflow-hidden">
			<div className="flex-[2]">
				<Compound
					onMount={(editor) => {
						editor.on('event', (event) => handleEvent(event))
					}}
				/>
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
				{events.map((t, i) => (
					<div key={i}>{t}</div>
				))}
			</div>
		</div>
	)
}
