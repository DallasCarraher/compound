import { SmartWindow } from '@/SmartWindow'
import { Compound, Editor } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { useLayoutEffect, useRef, useState } from 'react'

export default function ScrollExample() {
	const [editor, setEditor] = useState<Editor | null>(null)

	const container = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		const user = editor?.user
		if (editor && user) {
			if (user.getUserPreferences().isDarkMode) {
				container.current?.classList.remove('tl-theme__light')
				container.current?.classList.add('tl-theme__dark')
			} else {
				container.current?.classList.remove('tl-theme__dark')
				container.current?.classList.add('tl-theme__light')
			}
		}
	}, [editor])

	return (
		<section className="flex-1 overflow-auto">
			<div
				style={{
					width: '150vw',
					height: '150vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#fff',
				}}
			>
				<div style={{ width: '60vw', height: '80vh' }}>
					<Compound persistenceKey="scroll-example" onMount={(editor) => setEditor(editor)} />
				</div>
			</div>
			<SmartWindow
				id="info__multi-editor-example"
				title="Scrolling"
				iHeight={200}
				iWidth={250}
				location={{ x: '10px', y: '50px' }}
			>
				<p>
					This example simply demonstrates how the Compound editor can be used within a scrollable
					container.
				</p>
			</SmartWindow>
		</section>
	)
}
