import { SmartWindow } from '@/SmartWindow'
import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'

export default function ReadOnlyExample() {
	return (
		<div className="compound__editor">
			<Compound
				persistenceKey="compound_example"
				onMount={(editor) => {
					editor.updateInstanceState({ isReadonly: true })
				}}
			>
				<SmartWindow
					id="info__read-only-example"
					title="Read-Only Mode"
					iHeight={200}
					iWidth={300}
					lowerBound={200}
					upperBound={400}
					location={{
						x: '10px',
						y: '100px',
					}}
				>
					<p>
						This example demonstrates the process of setting the editor to read-only mode. The{' '}
						<code>onMount</code> prop is utilized to alter the editor's <code>isReadonly</code>{' '}
						state to true. As a result, all editing features are deactivated, leaving only the
						select tool, hand tool, and laser pointer visible on the toolbar.
					</p>
				</SmartWindow>
			</Compound>
		</div>
	)
}
