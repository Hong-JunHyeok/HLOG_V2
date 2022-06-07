import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EditorState, DraftEditorCommand, RichUtils,
  convertFromRaw, convertToRaw,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import AutosizeableTextarea from '@/components/Common/AutosizeableTextarea';
import S from './StyledEditor';
import useLocalStorage from '@/hooks/useLocalStorage';
import useSearchParam from '@/hooks/useSearchParam';
import usePost from '@/hooks/queries/usePost';
import useEditPost from '@/hooks/mutations/useEditPost';
import useModal from '@/hooks/useModal';
import useEditor from '@/hooks/useEditor';

interface StyleButtonProps {
  active: boolean;
  label: string | JSX.Element;
  onToggle: (blockType: string) => void;
  style: string;
}

function StyleButton({
  active,
  label,
  onToggle,
  style,
}: StyleButtonProps) {
  const handleToggle = (event) => {
    event.preventDefault();
    onToggle(style);
  };

  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={handleToggle} role="button" tabIndex={0}>
      {label}
    </span>
  );
}

const BLOCK_TYPES = [
  {
    label: (
      <>
        <FontAwesomeIcon icon={solid('h')} />
        1
      </>
    ),
    style: 'header-one',
  },
  {
    label: (
      <>
        <FontAwesomeIcon icon={solid('h')} />
        2
      </>
    ),
    style: 'header-two',
  },
  {
    label: (
      <>
        <FontAwesomeIcon icon={solid('h')} />
        3
      </>
    ),
    style: 'header-three',
  },
  { label: 'Blockquote', style: 'blockquote' },
  { label: <FontAwesomeIcon icon={solid('list-ul')} />, style: 'unordered-list-item' },
  { label: <FontAwesomeIcon icon={solid('list-ol')} />, style: 'ordered-list-item' },
  { label: <FontAwesomeIcon icon={solid('code')} />, style: 'code-block' },
];

function BlockStyleControls(props: {
  editorState : EditorState,
  onToggle: (blockType: string) => void
}) {
  const { editorState, onToggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls block_controls">
      {BLOCK_TYPES.map((type, idx) => (
        <StyleButton
          key={idx}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

const INLINE_STYLES = [
  { label: <FontAwesomeIcon icon={solid('bold')} />, style: 'BOLD' },
  { label: <FontAwesomeIcon icon={solid('italic')} />, style: 'ITALIC' },
  { label: <FontAwesomeIcon icon={solid('underline')} />, style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

function InlineStyleControls(props: {
  editorState : EditorState,
  onToggle: (blockType: string) => void
}) {
  const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls inline_controls">
      {INLINE_STYLES.map((type, idx) => (
        <StyleButton
          key={idx}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

function HlogEditor() {
  const navigate = useNavigate();

  const {
    postTitle,
    postContent,
    setPostTitle,
    setPostContent,
    clearContent,
  } = useEditor();

  const [isEdit, setIsEdit] = useState(false);
  const searchData = useSearchParam();
  const loadEditData = useCallback(() => {
    setIsEdit(true);
  }, []);

  const { data } = usePost(+searchData?.postId, isEdit);
  const { openModal: openPostConfigureModal } = useModal();

  const {
    storedValue: savedEditorTitle,
    setValue: setSavedEditorTitle,
  } = useLocalStorage('hlog_editor_title', '');

  const {
    storedValue: savedEditorContent,
    setValue: setSavedEditorContent,
  } = useLocalStorage('hlog_editor_content', '');

  const handleExit = () => navigate(-1);

  const changeEditorContent = (state: EditorState) => setPostContent(state);

  const handleSaveContent = () => {
    setSavedEditorTitle(postTitle);
    const content = postContent.getCurrentContent();
    setSavedEditorContent(convertToRaw(content));
  };

  const toggleBlockType = (blockType: string) => changeEditorContent(
    RichUtils.toggleBlockType(
      postContent,
      blockType,
    ),
  );

  const toggleInlineStyle = (inlineStyle: string) => changeEditorContent(
    RichUtils.toggleInlineStyle(
      postContent,
      inlineStyle,
    ),
  );

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(postContent, command);
    if (newState) {
      setPostContent(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const blockStyleClassMap = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case 'blockquote':
        return 'hlog_blockquote';
      case 'code-block':
        return 'hlog_code';
      default:
        return null;
    }
  };

  const editPostMutate = useEditPost();

  const editPost = () => {
    const contentToHtml = convertToHTML({
      blockToHTML: (block) => {
        if (block.type === 'blockquote') {
          return <blockquote className="hlog_blockquote" />;
        }

        if (block.type === 'pre') {
          return <pre className="hlog_code" />;
        }
        return null;
      },

      entityToHTML: (entiry, originalText) => {
        if (entiry.type === 'CODE') {
          return <code>{originalText}</code>;
        }
        return originalText;
      },
    })(postContent.getCurrentContent());

    editPostMutate({
      postId: +searchData?.postId,
      postTitle,
      postContent: contentToHtml,
    });
  };

  const createPost = () => {
    if (!postTitle || !postContent.getCurrentContent().hasText()) {
      return;
    }

    openPostConfigureModal();
  };

  useEffect(() => {
    // 초기 상태 선언
    if (searchData) {
      loadEditData();
    } else {
      clearContent();
    }
  }, [searchData, isEdit, loadEditData, clearContent]);

  useEffect(() => {
    // 임시 저장된 데이터 불러오기
    if (!isEdit) {
      setPostTitle(savedEditorTitle || '');

      if (savedEditorContent) {
        const savedEditorState = EditorState
          .createWithContent(convertFromRaw(savedEditorContent));
        setPostContent(savedEditorState);
      }
    }
  }, [isEdit, savedEditorTitle, savedEditorContent, setPostTitle, setPostContent]);

  useEffect(() => {
    // 수정 상태일 때 초기 상태 불러오기
    if (isEdit && data) {
      setPostTitle(data.post.postTitle);

      const contentState = EditorState
        .createWithContent(
          convertFromHTML((data.post.postContent)),
        );

      setPostContent(contentState);
    }
  }, [data, isEdit, setPostContent, setPostTitle]);

  return (
    <S.Container>
      <S.Header>
        <button type="button" className="exit" onClick={handleExit}>나가기</button>
        <div className="utils">
          {
              isEdit
                ? (
                  <button type="button" className="normal-button post" onClick={editPost}>포스트</button>
                )
                : (
                  <>
                    <button type="button" className="normal-button" onClick={handleSaveContent}>임시저장</button>
                    <button type="button" className="normal-button post" onClick={createPost}>포스트</button>
                  </>
                )

            }
        </div>
      </S.Header>
      <AutosizeableTextarea
        placeholder="제목을 입력하세요."
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        className="title-input"
      />
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={postContent}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={postContent}
          onToggle={toggleInlineStyle}
        />
        <Editor
          editorState={postContent}
          handleKeyCommand={handleKeyCommand}
          onChange={setPostContent}
          blockStyleFn={blockStyleClassMap}
          placeholder="내용을 입력해주세요..."
          spellCheck
        />
      </div>
    </S.Container>
  );
}

export default HlogEditor;
