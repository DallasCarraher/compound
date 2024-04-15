import { SerializedSchema } from '@cmpd/store'
import { TLAsset, TLShape, TLShapeId } from '@cmpd/tlschema'

/** @public */
export interface TLContent {
	shapes: TLShape[]
	rootShapeIds: TLShapeId[]
	assets: TLAsset[]
	schema: SerializedSchema
}
