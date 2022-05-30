import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Editor, EditorState, DraftEditorCommand, RichUtils,
  convertFromRaw, convertToRaw,
} from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import AutosizeableTextarea from '@/components/Common/AutosizeableTextarea';
import 'draft-js/dist/Draft.css';
import S from './StyledEditor';
import useLocalStorage from '@/utils/useLocalStorage';
import SuccessModal from '@/components/Modal/Success/SuccessModal';
import ErrorModal from '@/components/Modal/Error/ErrorModal';
import useInterceptedAxios from '@/hooks/useInterceptedAxios';
import useSearchParam from '@/hooks/useSearchParam';
import usePost from '@/hooks/queries/usePost';
import useEditPost from '@/hooks/mutations/useEditPost';
import useModal from '@/hooks/useModal';
import useEditor from '@/hooks/useEditor';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

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
  } = useEditor();

  const [isEdit, setIsEdit] = useState(false);
  const searchData = useSearchParam();
  const loadEditData = useCallback(() => {
    setIsEdit(true);
  }, []);

  const { data } = usePost(+searchData?.postId, isEdit);
  const { openModal } = useModal();

  useEffect(() => {
    if (searchData) {
      loadEditData();
    }
  }, [searchData, isEdit, loadEditData]);

  useEffect(() => {
    if (isEdit && data) {
      setPostTitle(data.post.postTitle);

      const contentState = EditorState.createWithContent(convertFromHTML((data.post.postContent)));

      setPostContent(contentState);
    }
  }, [data, isEdit, setPostContent, setPostTitle]);

  const {
    storedValue: editorTitle,
    setValue: setEditorTitle,
    remove: clearEditorTitle,
  } = useLocalStorage('hlog_editor_title', '');

  const {
    storedValue: editorContent,
    setValue: setEditorContent,
    remove: clearEditorContent,
  } = useLocalStorage('hlog_editor_content', '');
  const [createPostSuccessModal, setCreatePostSuccessModal] = useState(false);

  const [createPostErrorMessage, setCreatePostErrorMessage] = useState('');
  const [createPostErrorModal, setCreatePostErrorModal] = useState(false);

  useEffect(() => {
    setPostTitle(editorTitle || '');

    if (editorContent) {
      const savedEditorState = EditorState.createWithContent(convertFromRaw(editorContent));
      setPostContent(savedEditorState);
    }
  }, [editorTitle, editorContent, setPostTitle, setPostContent]);

  const handleExit = () => navigate(-1);

  const changeEditorContent = (state: EditorState) => setPostContent(state);

  const handleSaveContent = () => {
    setEditorTitle(postTitle);
    const content = postContent.getCurrentContent();
    // @ts-ignore
    setEditorContent(convertToRaw(content));
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
      default:
        return null;
    }
  };

  const resetSavedContent = () => {
    clearEditorTitle();
    clearEditorContent();
  };

  const editPostMutate = useEditPost();

  const editPost = () => {
    const contentToHtml = convertToHTML({
      blockToHTML: (block) => {
        if (block.type === 'blockquote') {
          return <blockquote className="hlog_blockquote" />;
        }
        return null;
      },
    })(postContent.getCurrentContent());

    editPostMutate({
      postId: +searchData?.postId,
      postTitle,
      postContent: contentToHtml,
    }).then(resetSavedContent);
  };

  const createPost = () => {
    if (!postTitle) {
      setCreatePostErrorMessage('제목을 입력해주세요.');
      setCreatePostErrorModal(true);
      return;
    }

    if (!postContent.getCurrentContent().hasText()) {
      setCreatePostErrorMessage('본문을 입력해주세요.');
      setCreatePostErrorModal(true);
      return;
    }

    openModal();
  };

  return (
    <>
      <S.Container>
        <S.Header>
          <button type="button" className="exit" onClick={handleExit}>나가기</button>
          <div className="utils">
            <button type="button" className="normal-button" onClick={handleSaveContent}>임시저장</button>
            <button type="button" className="normal-button post" onClick={isEdit ? editPost : createPost}>포스트</button>
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
            customStyleMap={styleMap}
            editorState={postContent}
            handleKeyCommand={handleKeyCommand}
            onChange={setPostContent}
            blockStyleFn={blockStyleClassMap}
            placeholder="내용을 입력해주세요..."
            spellCheck
          />
        </div>
      </S.Container>

      {createPostSuccessModal
        && (
        <SuccessModal
          successTitle="포스트 성공"
          onClose={() => setCreatePostSuccessModal(false)}
        />
        )}

      {createPostErrorModal
        && (
        <ErrorModal
          errorTitle={createPostErrorMessage}
          onClose={() => setCreatePostErrorModal(false)}
        />
        )}
    </>
  );
}

export default HlogEditor;
