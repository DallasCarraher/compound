import {
	Canvas,
	CompoundUi,
	ContextMenu,
	TldrawEditor,
	TldrawHandles,
	TldrawHoveredShapeIndicator,
	TldrawScribble,
	TldrawSelectionBackground,
	TldrawSelectionForeground,
	defaultShapeTools,
	defaultShapeUtils,
	defaultTools,
} from '@cmpd/compound'
import '@cmpd/compound/compound.css'

const defaultComponents = {
	Scribble: TldrawScribble,
	CollaboratorScribble: TldrawScribble,
	SelectionForeground: TldrawSelectionForeground,
	SelectionBackground: TldrawSelectionBackground,
	Handles: TldrawHandles,
	HoveredShapeIndicator: TldrawHoveredShapeIndicator,
}

export default function ExplodedExample() {
	return (
		<div className="compound__editor">
			<TldrawEditor
				initialState="select"
				shapeUtils={defaultShapeUtils}
				tools={[...defaultTools, ...defaultShapeTools]}
				components={defaultComponents}
				persistenceKey="exploded-example"
			>
				<CompoundUi>
					<ContextMenu>
						<Canvas />
					</ContextMenu>
				</CompoundUi>
			</TldrawEditor>
		</div>
	)
}
