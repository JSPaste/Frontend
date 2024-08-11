import type { HeaderProps } from '@/component/HeaderComponent';
import type { LangsKey } from '@/utils/langs.ts';
import { languageStore, themeStore } from '@/utils/store.ts';
import { hyperLink } from '@uiw/codemirror-extensions-hyper-link';
import { langs } from '@uiw/codemirror-extensions-langs';
import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import hljs from 'highlight.js';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

type EditorProps = {
	setCursorLocation: (info: HeaderProps) => void;
	setValue: (value: string) => void;
	value: string;
	documentName?: string;
	isEditing: boolean;
	enableEdit: boolean;
};

export default function (props: EditorProps) {
	const editorRef = useRef<ReactCodeMirrorRef>(null);

	const updateCursorInformation = useCallback(
		debounce(
			() => {
				const editor = editorRef.current;

				if (editor?.view) {
					const { from } = editor.view.state.selection.main;
					const cursorPosition = editor.view.state.doc.lineAt(from);

					props.setCursorLocation({
						lineNumber: cursorPosition.number,
						columnNumber: from - cursorPosition.from + 1
					});
				}
			},
			100,
			{ maxWait: 500 }
		),
		[]
	);

	const { getLanguage, setLanguage } = languageStore();

	const autoLanguage = useCallback(
		debounce(
			(content: string) => {
				const result = hljs.highlightAuto(content);

				if (result.language && result.language in langs) {
					console.debug('[EDITOR - autoLanguage] First detected language:', result.language);
					return setLanguage(result.language as LangsKey);
				}

				if (result.secondBest?.language && result.secondBest.language in langs) {
					console.debug('[EDITOR - autoLanguage] Second detected language:', result.secondBest?.language);
					return setLanguage(result.secondBest?.language as LangsKey);
				}

				console.debug('[EDITOR - autoLanguage] Fallback to markdown');
				return setLanguage('markdown');
			},
			1000,
			{ leading: true }
		),
		[]
	);

	const onChange = useCallback(
		(value: string) => {
			updateCursorInformation();
			autoLanguage(value);
			// props.setValue(value);
		},
		[updateCursorInformation, autoLanguage]
	);

	useEffect(() => {
		autoLanguage(props.value);
	}, [autoLanguage, props.value]);

	const { getTheme } = themeStore();

	return (
		<ReactCodeMirror
			ref={editorRef}
			onChange={onChange}
			height='100%'
			className='flex-grow overflow-auto'
			extensions={[getLanguage(), hyperLink]}
			theme={getTheme().codemirrorTheme}
			placeholder="Start writing here! When you're done, hit the save button to generate a unique URL with your content."
			value={props.value}
			readOnly={props.enableEdit && !props.isEditing}
			autoFocus={true}
			basicSetup={{
				lineNumbers: true,
				highlightActiveLineGutter: true,
				highlightActiveLine: true,
				autocompletion: true,
				allowMultipleSelections: false,
				syntaxHighlighting: true
			}}
		/>
	);
}
