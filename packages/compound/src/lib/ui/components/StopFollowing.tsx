import { track, useEditor } from '@cmpd/editor'
import { useActions } from '../hooks/useActions'
import { Button } from './primitives/Button'

export const StopFollowing = track(function ExitPenMode() {
	const editor = useEditor()
	const actions = useActions()

	if (!editor.getInstanceState().followingUserId) {
		return null
	}

	const action = actions['stop-following']

	return (
		<Button
			type="normal"
			label={action.label}
			iconLeft={action.icon}
			onClick={() => action.onSelect('people-menu')}
		/>
	)
})
