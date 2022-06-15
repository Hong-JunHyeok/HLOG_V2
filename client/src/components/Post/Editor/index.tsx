import {
  useCallback, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EditorState, RichUtils,
  convertFromRaw, convertToRaw, KeyBindingUtil, getDefaultKeyBinding,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { Slide, toast, ToastContainer } from 'react-toastify';
import AutosizeableTextarea from '@/components/Common/AutosizeableTextarea';
import S from './StyledEditor';
import useLocalStorage from '@/hooks/useLocalStorage';
import useSearchParam from '@/hooks/useSearchParam';
import usePost from '@/hooks/queries/usePost';
import useEditPost from '@/hooks/mutations/useEditPost';
import useModals from '@/hooks/useModals';
import useEditor from '@/hooks/useEditor';
import HelpModal from '@/components/Modal/Post/HelpModal';
import CreatePostConfigure from '../CreatePostConfigure';
import { HELP_MODAL_KEY, POST_CONFIGURE_MODAL_KEY } from '../../../constants/modals/index';

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
  { label: <FontAwesomeIcon icon={solid('quote-left')} />, style: 'blockquote' },
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

  const {
    storedValue: savedEditorTitle,
    setValue: setSavedEditorTitle,
  } = useLocalStorage('hlog_editor_title', '');

  const {
    storedValue: savedEditorContent,
    setValue: setSavedEditorContent,
  } = useLocalStorage('hlog_editor_content', '');
  const { openModal } = useModals();

  const handleExit = () => navigate(-1);

  const changeEditorContent = (state: EditorState) => setPostContent(state);

  const handleSaveContent = () => {
    setSavedEditorTitle(postTitle);
    const content = postContent.getCurrentContent();
    setSavedEditorContent(convertToRaw(content));

    toast('임시저장 되었습니다.', {
      type: 'success',
      theme: 'colored',
    });
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

  const toggleBlock = (type) => RichUtils.toggleBlockType(postContent, type);

  const handleKeyCommand = (command) => {
    let editorState = RichUtils.handleKeyCommand(postContent, command);

    if (!editorState && command === 'strikethrough') {
      editorState = RichUtils.toggleInlineStyle(postContent, 'STRIKETHROUGH');
    }
    if (!editorState && command === 'header-one') {
      editorState = toggleBlock(command);
    }
    if (!editorState && command === 'header-two') {
      editorState = toggleBlock(command);
    }
    if (!editorState && command === 'header-three') {
      editorState = toggleBlock(command);
    }
    if (!editorState && command === 'underline') {
      editorState = toggleBlock(command);
    }
    if (!editorState && command === 'ordered-list-item') {
      editorState = toggleBlock(command);
    }
    if (!editorState && command === 'unordered-list-item') {
      editorState = toggleBlock(command);
    }
    if (!editorState && command === 'code-block') {
      editorState = toggleBlock(command);
    }
    if (!editorState && command === 'save') {
      handleSaveContent();
    }

    if (editorState) {
      setPostContent(editorState);
      return 'handled';
    }
    return 'not-handled';
  };

  const keyBindingFunction = (event: React.KeyboardEvent<Element>) => {
    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.shiftKey
      && event.key === 'x'
    ) {
      return 'strikethrough';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.shiftKey
      && event.key === 'o'
    ) {
      return 'ordered-list-item';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.shiftKey
      && event.key === 'u'
    ) {
      return 'unordered-list-item';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.shiftKey
      && event.key === ','
    ) {
      return 'code-block';
    }
    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.key === '1'
    ) {
      return 'header-one';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.key === '2'
    ) {
      return 'header-two';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.key === '3'
    ) {
      return 'header-three';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.key === 'u'
    ) {
      return 'underline';
    }

    if (
      KeyBindingUtil.hasCommandModifier(event)
      && event.key === 's'
    ) {
      return 'save';
    }

    return getDefaultKeyBinding(event);
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
      toast.warn('빈칸이 존재합니다.', {
        theme: 'colored',
      });
    }

    openModal(POST_CONFIGURE_MODAL_KEY, CreatePostConfigure);
  };

  const handleViewHelp = () => {
    openModal(HELP_MODAL_KEY, HelpModal);
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
    <>
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
                    <button type="button" className="normal-button" onClick={handleViewHelp}>
                      <FontAwesomeIcon icon={solid('circle-info')} />
                    </button>
                    <button type="button" className="normal-button" onClick={handleSaveContent}>임시저장</button>
                    <button type="button" className="normal-button post" onClick={createPost}>포스트</button>
                  </>
                )
            }
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
          />
        </S.Header>
        <AutosizeableTextarea
          placeholder="제목을 입력하세요."
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          className="title-input"
        />
        <div className="RichEditor-root">
          <S.ToolContainer>
            <BlockStyleControls
              editorState={postContent}
              onToggle={toggleBlockType}
            />
            <InlineStyleControls
              editorState={postContent}
              onToggle={toggleInlineStyle}
            />
          </S.ToolContainer>
          <Editor
            editorState={postContent}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBindingFunction}
            onChange={setPostContent}
            blockStyleFn={blockStyleClassMap}
            placeholder="내용을 입력해주세요..."
            spellCheck
          />
        </div>
      </S.Container>
    </>
  );
}

export default HlogEditor;
