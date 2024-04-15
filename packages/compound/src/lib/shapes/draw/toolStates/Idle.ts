import { StateNode, TLEventHandlers } from '@cmpd/editor'

export class Idle extends StateNode {
	static override id = 'idle'

	override onPointerDown: TLEventHandlers['onPointerDown'] = (info) => {
		this.parent.transition('drawing', info)
	}

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onCancel = () => {
		this.editor.setCurrentTool('select')
	}
}
