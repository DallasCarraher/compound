import { TLShape } from '@cmpd/tlschema'
import { StateNode } from '../StateNode'
import { Idle } from './children/Idle'
import { Pointing } from './children/Pointing'

/** @public */
export abstract class BaseBoxShapeTool extends StateNode {
	static override id = 'box'
	static override initial = 'idle'
	static override children = () => [Idle, Pointing]

	abstract override shapeType: string

	onCreate?: (_shape: TLShape | null) => void | null
}
