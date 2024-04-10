import { TLShapeId } from '@cmpd/tlschema'
import { ComponentType } from 'react'
import { ShapeIndicator } from '../ShapeIndicator'

/** @public */
export type TLHoveredShapeIndicatorComponent = ComponentType<{
	shapeId: TLShapeId
}>

/** @public */
export const DefaultHoveredShapeIndicator: TLHoveredShapeIndicatorComponent = ({ shapeId }) => {
	return <ShapeIndicator className="tl-user-indicator__hovered" id={shapeId} />
}
