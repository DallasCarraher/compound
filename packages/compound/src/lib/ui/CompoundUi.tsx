import { useEditor, useValue } from '@cmpd/editor'
import { ToastProvider } from '@radix-ui/react-toast'
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import {
	CompoundUiContextProvider,
	CompoundUiContextProviderProps,
} from './CompoundUiContextProvider'
import { TLUiAssetUrlOverrides } from './assetUrls'
import { BackToContent } from './components/BackToContent'
import { DebugPanel } from './components/DebugPanel'
import { Dialogs } from './components/Dialogs'
import { FollowingIndicator } from './components/FollowingIndicator'
import { HelpMenu } from './components/HelpMenu'
import { MenuZone } from './components/MenuZone'
import { NavigationZone } from './components/NavigationZone/NavigationZone'
import { ExitPenMode } from './components/PenModeToggle'
import { StopFollowing } from './components/StopFollowing'
import { StylePanel } from './components/StylePanel/StylePanel'
import { ToastViewport, Toasts } from './components/Toasts'
import { Toolbar } from './components/Toolbar/Toolbar'
import { Button } from './components/primitives/Button'
import { useActions } from './hooks/useActions'
import { useBreakpoint } from './hooks/useBreakpoint'
import { useNativeClipboardEvents } from './hooks/useClipboardEvents'
import { useEditorEvents } from './hooks/useEditorEvents'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useTranslation } from './hooks/useTranslation/useTranslation'

/**
 * Base props for the {@link @cmpd/compound#Compound} and {@link CompoundUi} components.
 *
 * @public
 */
export interface CompoundUiBaseProps {
	/**
	 * The component's children.
	 */
	children?: ReactNode

	/**
	 * Whether to hide the user interface and only display the canvas.
	 */
	hideUi?: boolean

	/**
	 * A component to use for the share zone (will be deprecated)
	 */
	shareZone?: ReactNode

	/**
	 * A component to use for the top zone (will be deprecated)
	 */
	topZone?: ReactNode

	/**
	 * Additional items to add to the debug menu (will be deprecated)
	 */
	renderDebugMenuItems?: () => React.ReactNode

	/** Asset URL override. */
	assetUrls?: TLUiAssetUrlOverrides
}

/**
 * Props for the {@link @cmpd/compound#Compound} and {@link CompoundUi} components.
 *
 * @public
 */
export type CompoundUiProps = CompoundUiBaseProps & CompoundUiContextProviderProps

/**
 * @public
 */
export const CompoundUi = React.memo(function CompoundUi({
	shareZone,
	topZone,
	renderDebugMenuItems,
	children,
	hideUi,
	...rest
}: CompoundUiProps) {
	return (
		<CompoundUiContextProvider {...rest}>
			<>
				{children}
				{/* 
					The 'hideUi' prop should prevent the UI from mounting.
					If we ever need want the UI to mount and preserve state, then
					we should change this behavior and hide the UI via CSS instead.
				*/}
				{hideUi ? null : (
					<CompoundUiContent
						hideUi={hideUi}
						shareZone={shareZone}
						topZone={topZone}
						renderDebugMenuItems={renderDebugMenuItems}
					/>
				)}
			</>
		</CompoundUiContextProvider>
	)
})

interface CompoundUiContentProps {
	hideUi?: boolean
	shareZone?: ReactNode
	topZone?: ReactNode
	renderDebugMenuItems?: () => React.ReactNode
}

const CompoundUiContent = React.memo(function CompoundUI({
	shareZone,
	topZone,
	renderDebugMenuItems,
}: CompoundUiContentProps) {
	const editor = useEditor()
	const msg = useTranslation()
	const breakpoint = useBreakpoint()
	const isReadonlyMode = useValue('isReadonlyMode', () => editor.getInstanceState().isReadonly, [
		editor,
	])
	const isFocusMode = useValue('focus', () => editor.getInstanceState().isFocusMode, [editor])
	const isDebugMode = useValue('debug', () => editor.getInstanceState().isDebugMode, [editor])

	useKeyboardShortcuts()
	useNativeClipboardEvents()
	useEditorEvents()

	const { 'toggle-focus-mode': toggleFocus } = useActions()

	return (
		<ToastProvider>
			<div
				className={classNames('tlui-layout', {
					'tlui-layout__mobile': breakpoint < 5,
				})}
				data-breakpoint={breakpoint}
			>
				{isFocusMode ? (
					<div className="tlui-layout__top">
						<Button
							type="icon"
							className="tlui-focus-button"
							title={`${msg('focus-mode.toggle-focus-mode')}`}
							icon="dot"
							onClick={() => toggleFocus.onSelect('menu')}
						/>
					</div>
				) : (
					<>
						<div className="tlui-layout__top">
							<div className="tlui-layout__top__left">
								<MenuZone />
								<div className="tlui-helper-buttons">
									<ExitPenMode />
									<BackToContent />
									<StopFollowing />
								</div>
							</div>
							<div className="tlui-layout__top__center">{topZone}</div>
							<div className="tlui-layout__top__right">
								{shareZone}
								{breakpoint >= 5 && !isReadonlyMode && (
									<div className="tlui-style-panel__wrapper">
										<StylePanel />
									</div>
								)}
							</div>
						</div>
						<div className="tlui-layout__bottom">
							<div className="tlui-layout__bottom__main">
								<NavigationZone />
								<Toolbar />
								{breakpoint >= 4 && <HelpMenu />}
							</div>
							{isDebugMode && <DebugPanel renderDebugMenuItems={renderDebugMenuItems ?? null} />}
						</div>
					</>
				)}
				<Toasts />
				<Dialogs />
				<ToastViewport />
				<FollowingIndicator />
			</div>
		</ToastProvider>
	)
})
