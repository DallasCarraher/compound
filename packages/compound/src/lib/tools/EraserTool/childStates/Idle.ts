import { StateNode, TLEventHandlers } from '@cmpd/editor'

export class Idle extends StateNode {
	static override id = 'idle'

	override onPointerDown: TLEventHandlers['onPointerDown'] = (info) => {
		this.parent.transition('pointing', info)
	}

	override onCancel = () => {
		this.editor.setCurrentTool('select')
	}
}
