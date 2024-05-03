import { X } from 'lucide-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import './styles.css'

interface Props {
	id: string
	title?: string
	iWidth?: number
	iHeight?: number
	upperBound?: number
	lowerBound?: number
	location?: { x: string; y: string }
	children?: React.ReactNode | string
}

export const SmartWindow: FC<Props> = ({
	id,
	title,
	children,
	iWidth = 250,
	iHeight = 250,
	upperBound = 600,
	lowerBound = 150,
	location = { x: '100px', y: '100px' },
}) => {
	const [visible, setVisible] = useState(true)
	const dialogRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const resizeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const dialog = dialogRef.current
		const header = headerRef.current
		const resizeHandle = resizeRef.current
		if (!dialog || !header || !resizeHandle) return

		let offsetX = 0,
			offsetY = 0,
			startX = 0,
			startY = 0

		// -------------------------
		// Move
		// -------------------------
		const onMove = (e: MouseEvent | TouchEvent) => {
			let clientX, clientY

			if (e instanceof MouseEvent) {
				clientX = e.clientX
				clientY = e.clientY
			} else if (e instanceof TouchEvent && e.touches[0]) {
				clientX = e.touches[0].clientX
				clientY = e.touches[0].clientY
			}

			if (clientX === undefined || clientY === undefined) return

			// Calculate the difference between the current mouse position and the starting mouse position
			const dx = clientX - startX
			const dy = clientY - startY

			const rect = dialog.getBoundingClientRect()
			const parentRect = dialog.parentElement?.getBoundingClientRect()

			if (parentRect) {
				// If the left edge of the dialog is moving beyond the left edge of the parent
				if (rect.left + dx <= parentRect.left) {
					offsetX -= dx
				}
				// If the dialog is within the parent boundaries and we're moving right
				else if (rect.right + dx <= parentRect.right) {
					// Update the offsetX by the amount we've moved the mouse
					offsetX += dx
				}

				// If the top edge of the dialog is moving beyond the top edge of the parent
				if (rect.top + dy < parentRect.top) {
					// Reset the offsetY to the top edge of the parent
					offsetY = parentRect.top
				}
				// If the bottom edge of the dialog is moving beyond the bottom edge of the parent
				else if (rect.bottom + dy > parentRect.bottom) {
					// Reset the offsetY to the bottom edge of the parent minus the height of the dialog
					// This effectively places the dialog at the bottom edge of the parent
					offsetY = parentRect.bottom - rect.height
				}
				// If the dialog is within the parent boundaries
				else {
					// Update the offsetY by the amount we've moved the mouse
					offsetY += dy
				}
			}

			// Apply the new offsetX and offsetY to the dialog's transform style
			// This moves the dialog to the new position
			dialog.style.transform = `translate(${offsetX}px, ${offsetY}px)`

			// Update the starting mouse position for the next mousemove event
			startX = clientX
			startY = clientY
		}
		const onStart = (clientX: number, clientY: number) => {
			const transform = window.getComputedStyle(dialog).transform
			const matrix = new DOMMatrix(transform)
			offsetX = matrix.m41
			offsetY = matrix.m42
			startX = clientX
			startY = clientY
			document.addEventListener('mousemove', onMove)
			document.addEventListener('touchmove', onMove)
			document.addEventListener('mouseup', onEnd)
			document.addEventListener('touchend', onEnd)
		}
		const onHeaderMouseDown = (e: MouseEvent) => {
			onStart(e.clientX, e.clientY)
		}
		const onHeaderTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0]
			onStart(touch.clientX, touch.clientY)
		}
		const onEnd = () => {
			document.removeEventListener('mousemove', onMove)
			document.removeEventListener('touchmove', onMove)
			document.removeEventListener('mouseup', onEnd)
			document.removeEventListener('touchend', onEnd)
		}

		// -------------------------
		// Resize
		// -------------------------
		const onResize = (e: MouseEvent | TouchEvent) => {
			let clientX, clientY

			if (e instanceof MouseEvent) {
				clientX = e.clientX
				clientY = e.clientY
			} else if (e instanceof TouchEvent && e.touches[0]) {
				clientX = e.touches[0].clientX
				clientY = e.touches[0].clientY
			}

			if (clientX === undefined || clientY === undefined) return

			const dx = clientX - startX
			const dy = clientY - startY

			const newWidth = dialog.offsetWidth + dx
			const newHeight = dialog.offsetHeight + dy

			if (newWidth >= lowerBound && newWidth <= upperBound) {
				dialog.style.width = `${newWidth}px`
			}

			if (newHeight >= lowerBound && newHeight <= upperBound) {
				dialog.style.height = `${newHeight}px`
			}

			startX = clientX
			startY = clientY
		}
		const onResizeMouseDown = (e: MouseEvent) => {
			startX = e.clientX
			startY = e.clientY
			document.addEventListener('mousemove', onResize)
			document.addEventListener('mouseup', onResizeEnd)
		}
		const onResizeTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0]
			startX = touch.clientX
			startY = touch.clientY
			document.addEventListener('touchmove', onResize)
			document.addEventListener('touchend', onResizeEnd)
		}
		const onResizeEnd = () => {
			document.removeEventListener('mousemove', onResize)
			document.removeEventListener('mouseup', onResizeEnd)
			document.removeEventListener('touchmove', onResize)
			document.removeEventListener('touchend', onResizeEnd)
		}

		// -------------------------------------------
		// Event listeners - header and resize handle
		// -------------------------------------------

		header.addEventListener('mousedown', onHeaderMouseDown)
		header.addEventListener('touchstart', onHeaderTouchStart)
		resizeHandle.addEventListener('mousedown', onResizeMouseDown)
		resizeHandle.addEventListener('touchstart', onResizeTouchStart)

		return () => {
			// header and resize handle listeners
			header.removeEventListener('mousedown', onHeaderMouseDown)
			header.removeEventListener('touchstart', onHeaderTouchStart)
			resizeHandle.removeEventListener('mousedown', onResizeMouseDown)
			resizeHandle.removeEventListener('touchstart', onResizeTouchStart)
		}
	}, [lowerBound, upperBound])

	if (!visible) return null

	return (
		<div
			ref={dialogRef}
			id={`smartWindow-${id}`}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				transform: `translate(${location.x}, ${location.y})`,
				zIndex: 400,
				width: `${iWidth}px`,
				height: `${iHeight}px`,
				padding: 8,
				background: 'var(--color-panel)',
				// border: '2px solid black',
				borderRadius: 'var(--radius-1)',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				userSelect: 'none',
				boxShadow: 'var(--shadow-2)',
			}}
		>
			<div
				id="smartWindow__container"
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					overflow: 'hidden',
				}}
			>
				<div
					ref={headerRef}
					id="smartWindow__header"
					style={{
						position: 'sticky',
						top: 0,
						cursor: 'grab',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: 30,
						marginBottom: 10,
					}}
				>
					<span style={{ fontWeight: 700, fontSize: 14 }}>{title}</span>
					<button
						style={{
							background: 'none',
							border: 'none',
							cursor: 'pointer',
						}}
						onClick={() => setVisible(false)}
					>
						<X size={16} />
					</button>
				</div>
				<div
					id="smartWindow__content"
					style={{
						overflow: 'auto',
						flex: 1,
						marginBottom: 20,
						scrollbarWidth: 'thin',
						scrollbarColor: 'grey transparent',
					}}
				>
					{children}
				</div>
				<div
					ref={resizeRef}
					style={{
						position: 'absolute',
						right: 0,
						bottom: 0,
						width: 20,
						height: 20,
						cursor: 'nwse-resize',
					}}
				>
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M21 15L15 21M21 8L8 21"
								stroke="#000000"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	)
}
