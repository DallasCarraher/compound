import { Compound } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { CardShapeTool, CardShapeUtil } from './CardShape'
import { FilterStyleUi } from './FilterStyleUi'
import { uiOverrides } from './ui-overrides'

const customShapeUtils = [CardShapeUtil]
const customTools = [CardShapeTool]

export default function CustomStylesExample() {
	return (
		<div className="compound__editor">
			<Compound
				persistenceKey="custom-styles-example"
				shapeUtils={customShapeUtils}
				tools={customTools}
				overrides={uiOverrides}
			>
				<FilterStyleUi />
			</Compound>
		</div>
	)
}
