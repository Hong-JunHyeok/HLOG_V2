import { RichUtils, EditorState } from 'draft-js';

type ReturnTypes = [
  (type: string) => (event: React.MouseEvent) => void,
  (type: string) => (event: React.MouseEvent) => void,
];

const useCommandHandler = (
  editorState: EditorState,
  setEditorState:React.Dispatch<React.SetStateAction<EditorState>>,
): ReturnTypes => {
  const blockClickHandler = (
    type: string,
  ) => (event: React.MouseEvent) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const toggleInlineHandler = (
    type: string,
  ) => (event: React.MouseEvent) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  return [blockClickHandler, toggleInlineHandler];
};

export default useCommandHandler;
