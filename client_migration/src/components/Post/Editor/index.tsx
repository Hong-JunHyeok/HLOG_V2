import { useState } from 'react';
import { Editor, EditorState, DraftEditorCommand, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import AutosizeableTextarea from '@/components/Common/AutosizeableTextarea';
import useCommandHandler from '@/hooks/useCommandHandler';
import S from './StyledEditor';

const HlogEditor = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [blockClickHandler, toggleInlineHandler] = useCommandHandler(editorState, setEditorState);

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <S.Container>
      <S.ToolContainer>
        <S.ToolItem onClick={blockClickHandler('heading-one')}>H1</S.ToolItem>
        <S.ToolItem onClick={blockClickHandler('heading-two')}>H2</S.ToolItem>
        <S.ToolItem onClick={blockClickHandler('heading-three')}>H3</S.ToolItem>
        <S.ToolItem onClick={toggleInlineHandler('BOLD')}>B</S.ToolItem >
        <S.ToolItem onClick={toggleInlineHandler('ITALIC')}>I</S.ToolItem >
        <S.ToolItem onClick={toggleInlineHandler('ordered-list-item')}>OL</S.ToolItem >
        <S.ToolItem onClick={toggleInlineHandler('unordered-list-item')}>UL</S.ToolItem >
        <S.ToolItem onClick={() => setEditorState(EditorState.undo(editorState))}>UNDO</S.ToolItem>
        <S.ToolItem onClick={() => setEditorState(EditorState.redo(editorState))}>REDO</S.ToolItem>
      </S.ToolContainer>

      <AutosizeableTextarea 
        placeholder="제목을 입력하세요." 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      <Editor 
        placeholder='내용을 입력하세요.'
        editorState={editorState} 
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </S.Container>
    );
};

export default HlogEditor;
