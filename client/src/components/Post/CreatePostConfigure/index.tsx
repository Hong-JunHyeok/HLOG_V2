import { useEffect, useRef, useState } from 'react';
import { convertToHTML } from 'draft-convert';
import AutosizeableTextarea from '@/components/Common/AutosizeableTextarea';
import StyledCreatePostConfigure from './StyledCreatePostConfigure';
import useModals from '@/hooks/useModals';
import useDragAndDrop from '@/hooks/useDragAndDrop';
import usePublishPost from '@/hooks/mutations/usePublishPost';
import useEditThumbnail from '@/hooks/mutations/useEditThumbnail';
import useEditor from '@/hooks/useEditor';
import { POST_CONFIGURE_MODAL_KEY } from '@/constants/modals';

const CreatePostConfigure = () => {
  const [thumbnail, setThumbnail] = useState<File>(null);
  const [prevThumbnail, setPrevThumbnail] = useState<string | null>('');
  const [summary, setSummary] = useState('');
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { closeModal } = useModals();

  const isDragging = useDragAndDrop({
    dragRef: thumbnailInputRef,
    onChange: (data: FileList) => {
      const dropData = data[0];
      setThumbnail(dropData);
    },
  });

  const publishPost = usePublishPost();
  const uploadThumbnail = useEditThumbnail();
  const {
    postTitle, postContent,
  } = useEditor();

  const handleFileSelectButtonClick = () => {
    // TODO: 썸네일 드레그, 클릭 지원하기
    thumbnailInputRef.current.click();
  };

  const handleCloseConfigureModal = () => {
    closeModal(POST_CONFIGURE_MODAL_KEY);
  };

  const handlePublishPost = async () => {
    const contentToHtml = convertToHTML({
      blockToHTML: (block) => {
        if (block.type === 'blockquote') {
          return <blockquote className="hlog_blockquote" />;
        }
        return null;
      },
    })(postContent.getCurrentContent());

    const response = await publishPost({
      postTitle,
      postContent: contentToHtml,
      postSummary: summary,
    });
    const { postId } = response.data.payload;

    if (thumbnail) {
      const formedThumbnail = new FormData();
      formedThumbnail.append('thumbnail', thumbnail);
      await uploadThumbnail({
        postId,
        thumbnail: formedThumbnail,
      });
      handleCloseConfigureModal();
    } else {
      handleCloseConfigureModal();
    }
  };

  useEffect(() => {
    if (thumbnail) {
      const blobTransferData = new Blob([thumbnail]);
      setPrevThumbnail(URL.createObjectURL(blobTransferData));
    }
  }, [thumbnail]);

  return (
    <StyledCreatePostConfigure.Container>

      <StyledCreatePostConfigure.ThumbnailSection>
        <p className="label">썸네일 업로드</p>
        {
          prevThumbnail
            ? <img className="prev_thumbnail" src={prevThumbnail} alt="" />
            : (
              <div className={`upload_thumbnail ${isDragging && 'dragging'}`} ref={thumbnailInputRef}>
                <button type="button" onClick={handleFileSelectButtonClick}>썸네일 업로드</button>
                <input type="file" />
              </div>
            )
        }
      </StyledCreatePostConfigure.ThumbnailSection>

      <StyledCreatePostConfigure.PostSummarySecyion>
        <label htmlFor="summary" className="label">
          <p>글 요약</p>
          <AutosizeableTextarea
            placeholder="이 글의 요약을 적어주세요."
            className="summary_input"
            id="summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </label>
      </StyledCreatePostConfigure.PostSummarySecyion>

      <StyledCreatePostConfigure.PublishSection>
        <button type="button" className="button" onClick={handleCloseConfigureModal}>취소</button>
        <button type="button" className="button primary" onClick={handlePublishPost}>발행하기</button>
      </StyledCreatePostConfigure.PublishSection>

    </StyledCreatePostConfigure.Container>
  );
};

export default CreatePostConfigure;
