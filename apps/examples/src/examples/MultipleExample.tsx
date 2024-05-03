import { Compound, Editor } from '@cmpd/compound'
import '@cmpd/compound/compound.css'
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import { SmartWindow } from '../SmartWindow'

const CurrentEditorContext = createContext(
	{} as {
		currentEditor: Editor | null
		setCurrentEditor: (editor: Editor) => void
	}
)

export default function MultipleExample() {
	const [currentEditor, setCurrentEditor] = useState<Editor | null>(null)

	const container = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		const user = currentEditor?.user
		if (currentEditor && user) {
			if (user.getUserPreferences().isDarkMode) {
				container.current?.classList.remove('tl-theme__light')
				container.current?.classList.add('tl-theme__dark')
			} else {
				container.current?.classList.remove('tl-theme__dark')
				container.current?.classList.add('tl-theme__light')
			}
		}
	}, [currentEditor])

	return (
		<div
			ref={container}
			style={{
				backgroundColor: '#fff',
				padding: 32,
			}}
		>
			<CurrentEditorContext.Provider value={{ currentEditor, setCurrentEditor }}>
				<SmartWindow
					id="info__multi-editor-example"
					title="Multi-Editor Example"
					iHeight={300}
					iWidth={300}
					location={{ x: '50px', y: '150px' }}
				>
					<p>
						Click on an editor to focus it. The focused editor will be highlighted in the heading
						above.
					</p>
					<p>
						Editors "B" & "C" share the same persistence key so they will share a (locally)
						synchronized document.
					</p>
					<div
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						Focused:
						<strong> {currentEditor?.id ?? 'none'}</strong>
					</div>
				</SmartWindow>
				<div
					style={{
						display: 'flex',
						gap: 64,
					}}
				>
					<div style={{ flex: 1 }} />
					<EditorA />
				</div>
				<br />
				<div
					style={{
						display: 'flex',
						gap: 64,
					}}
				>
					<EditorB />
					<EditorC />
				</div>
			</CurrentEditorContext.Provider>
		</div>
	)
}

function EditorA() {
	const [_editor, _setEditor] = useState<Editor | null>(null)
	const { setCurrentEditor } = useContext(CurrentEditorContext)

	return (
		<div style={{ flex: 1 }}>
			<h2>A {_editor ? `- (${_editor.id})` : '- loading...'}</h2>
			<div
				tabIndex={-1}
				onFocus={() => _editor && setCurrentEditor(_editor)}
				style={{ height: 500 }}
			>
				<Compound
					persistenceKey="steve"
					className="A"
					autoFocus={false}
					onMount={(editor) => {
						_setEditor(editor)
						setCurrentEditor(editor)
					}}
				/>
			</div>
		</div>
	)
}

function EditorB() {
	const [_editor, _setEditor] = useState<Editor | null>(null)
	const { setCurrentEditor } = useContext(CurrentEditorContext)

	return (
		<div style={{ flex: 1 }}>
			<h2>B {_editor ? `- ${_editor.id}` : '- loading...'}</h2>
			<div
				tabIndex={-1}
				onFocus={() => _editor && setCurrentEditor(_editor)}
				style={{ height: 600 }}
			>
				<Compound
					persistenceKey="david"
					className="B"
					autoFocus={false}
					onMount={(editor) => _setEditor(editor)}
				/>
			</div>
		</div>
	)
}

function EditorC() {
	const [_editor, _setEditor] = useState<Editor | null>(null)
	const { setCurrentEditor } = useContext(CurrentEditorContext)

	return (
		<div style={{ flex: 1 }}>
			<h2>C {_editor ? `- ${_editor.id}` : '- loading...'}</h2>
			<div
				tabIndex={-1}
				onFocus={() => _editor && setCurrentEditor(_editor)}
				style={{ height: 600 }}
			>
				<Compound
					persistenceKey="david"
					className="C"
					autoFocus={false}
					onMount={(editor) => _setEditor(editor)}
				/>
			</div>
		</div>
	)
}
