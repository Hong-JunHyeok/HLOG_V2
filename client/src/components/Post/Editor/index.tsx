import { useState } from 'react';
import { Editor, EditorState, DraftEditorCommand, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import AutosizeableTextarea from '@/components/Common/AutosizeableTextarea';
import 'draft-js/dist/Draft.css';
import S from './StyledEditor';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const HlogEditor = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const changeEditorContent = (editorState: EditorState) => setEditorState(editorState);

  const toggleBlockType = (blockType: string) => changeEditorContent(
    RichUtils.toggleBlockType(
      editorState,
      blockType
    )
  )

  const toggleInlineStyle = (inlineStyle: string) => changeEditorContent(
    RichUtils.toggleInlineStyle(
      editorState,
      inlineStyle
    )
  )

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const blockStyleClassMap = (contentBlock) => {
    const type = contentBlock.getType();
    switch(type) {
      case 'blockquote':
        return 'hlog_blockquote';
      default:
        return null;
    }
  }

  const mapKeyToEditorCommand = (event) => {
    if (event.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        event,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(event);
  }

  return (
    <S.Container>
    <AutosizeableTextarea 
      placeholder="제목을 입력하세요." 
      value={title} 
      onChange={(e) => setTitle(e.target.value)}
      className="title-input"
    />
    <div className='RichEditor-root'>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <Editor 
        customStyleMap={styleMap}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        onChange={setEditorState}
        blockStyleFn={blockStyleClassMap}
        placeholder="내용을 입력해주세요..."
        spellCheck
      />
    </div>
  </S.Container>
    );
};

const StyleButton = ({ active, label, onToggle, style }) => {
  const handleToggle = (event: any) => {
    event.preventDefault();
    onToggle(style)
  }

  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  );
}


const BLOCK_TYPES = [
  {label: <><FontAwesomeIcon icon={solid('h')} />1</>, style: 'header-one'},
  {label: <><FontAwesomeIcon icon={solid('h')} />2</>, style: 'header-two'},
  {label: <><FontAwesomeIcon icon={solid('h')} />3</>, style: 'header-three'},
  {label: <><FontAwesomeIcon icon={solid('h')} />4</>, style: 'header-four'},
  {label: <><FontAwesomeIcon icon={solid('h')} />5</>, style: 'header-five'},
  {label: <><FontAwesomeIcon icon={solid('h')} />6</>, style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: <FontAwesomeIcon icon={solid('list-ul')} />, style: 'unordered-list-item'},
  {label: <FontAwesomeIcon icon={solid('list-ol')} />, style: 'ordered-list-item'},
  {label: <FontAwesomeIcon icon={solid('code')} />, style: 'code-block'},
];

const BlockStyleControls = (props: {
  editorState : EditorState, 
  onToggle: Function
}) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  
  return (
    <div className='RichEditor-controls block_controls'>
      {BLOCK_TYPES.map((type, idx) => 
        <StyleButton 
          key={idx}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

var INLINE_STYLES = [
  {label: <FontAwesomeIcon icon={solid('bold')} />, style: 'BOLD'},
  {label: <FontAwesomeIcon icon={solid('italic')} />, style: 'ITALIC'},
  {label: <FontAwesomeIcon icon={solid('underline')} />, style: 'UNDERLINE'},
  {label: "Monospace", style: 'CODE'},
];

const InlineStyleControls = (props: {
  editorState : EditorState,
  onToggle: Function
}) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls inline_controls">
      {INLINE_STYLES.map((type, idx) =>
        <StyleButton
          key={idx}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};


export default HlogEditor;
