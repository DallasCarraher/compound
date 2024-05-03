/* eslint-disable no-inner-declarations */
import { Compound, InstancePresenceRecordType } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { useRef } from 'react'

const USER_NAME = 'Daxter'
const MOVING_CURSOR_SPEED = 0.2 // 0 is stopped, 1 is full send
const MOVING_CURSOR_RADIUS = 50
const CURSOR_CHAT_MESSAGE = 'HOW AM I GONNA GET CHANGED BACK NOW?!'

// Note:
// Almost all of the information below is calculated automatically by helpers in the editor.
// For a more realistic implementation, see https://github.com/tldraw/tldraw-yjs-example. If anything,
// this example should be used to understand the data model and test designs, not as a reference
// for how to implement user presence.

export default function UserPresenceExample() {
	const rRaf = useRef<any>(-1)
	return (
		<div className="compound__editor">
			<Compound
				persistenceKey="user-presence-example"
				onMount={(editor) => {
					// For every connected peer you should put a TLInstancePresence record in the
					// store with their cursor position etc.

					const peerPresence = InstancePresenceRecordType.create({
						id: InstancePresenceRecordType.createId(editor.store.id),
						currentPageId: editor.getCurrentPageId(),
						userId: 'peer-1',
						userName: USER_NAME,
						// orange hex
						color: '#FF7600',
						cursor: { x: 0, y: 0, type: 'default', rotation: 0 },
						chatMessage: CURSOR_CHAT_MESSAGE,
					})

					editor.store.put([peerPresence])

					// Make the fake user's cursor rotate in a circle
					const raf = rRaf.current
					cancelAnimationFrame(raf)

					if (MOVING_CURSOR_SPEED > 0 || CURSOR_CHAT_MESSAGE) {
						function loop() {
							let cursor = peerPresence.cursor
							let chatMessage = peerPresence.chatMessage

							const now = Date.now()

							if (MOVING_CURSOR_SPEED > 0) {
								const k = 1000 / MOVING_CURSOR_SPEED
								const t = (now % k) / k

								cursor = {
									...peerPresence.cursor,
									x: 150 + Math.cos(t * Math.PI * 2) * MOVING_CURSOR_RADIUS,
									y: 150 + Math.sin(t * Math.PI * 2) * MOVING_CURSOR_RADIUS,
								}
							}

							if (CURSOR_CHAT_MESSAGE) {
								const k = 1000
								const t = (now % (k * 3)) / k
								chatMessage =
									t < 1
										? ''
										: t > 2
										? CURSOR_CHAT_MESSAGE
										: CURSOR_CHAT_MESSAGE.slice(0, Math.ceil((t - 1) * CURSOR_CHAT_MESSAGE.length))
							}

							editor.store.put([
								{
									...peerPresence,
									cursor,
									chatMessage,
									lastActivityTimestamp: now,
								},
							])

							rRaf.current = requestAnimationFrame(loop)
						}

						rRaf.current = requestAnimationFrame(loop)
					} else {
						editor.store.put([{ ...peerPresence, lastActivityTimestamp: Date.now() }])
						rRaf.current = setInterval(() => {
							editor.store.put([{ ...peerPresence, lastActivityTimestamp: Date.now() }])
						}, 1000)
					}
				}}
			/>
		</div>
	)
}
