import { TLUiMenuGroup, TLUiOverrides, menuItem, toolbarItem } from '@cmpd/compound'

export const uiOverrides: TLUiOverrides = {
	tools(editor, tools) {
		tools.card = {
			id: 'card',
			icon: 'color',
			label: 'Card' as any,
			kbd: 'c',
			readonlyOk: false,
			onSelect: () => {
				editor.setCurrentTool('card')
			},
		}
		return tools
	},
	toolbar(_app, toolbar, { tools }) {
		toolbar.splice(4, 0, toolbarItem(tools.card))
		return toolbar
	},
	keyboardShortcutsMenu(_app, keyboardShortcutsMenu, { tools }) {
		const toolsGroup = keyboardShortcutsMenu.find(
			(group) => group.id === 'shortcuts-dialog.tools'
		) as TLUiMenuGroup
		toolsGroup.children.push(menuItem(tools.card))
		return keyboardShortcutsMenu
	},
}
