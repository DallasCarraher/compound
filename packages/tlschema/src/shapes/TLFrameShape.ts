import { defineMigrations } from '@cmpd/store'
import { T } from '@cmpd/validate'
import { ShapePropsType, TLBaseShape } from './TLBaseShape'

/** @public */
export const frameShapeProps = {
	w: T.nonZeroNumber,
	h: T.nonZeroNumber,
	name: T.string,
}

type TLFrameShapeProps = ShapePropsType<typeof frameShapeProps>

/** @public */
export type TLFrameShape = TLBaseShape<'frame', TLFrameShapeProps>

/** @internal */
export const frameShapeMigrations = defineMigrations({})
