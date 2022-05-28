import StyledCreatePostConfigure from './StyledCreatePostConfigure';

const CreatePostConfigure = () => (
  <StyledCreatePostConfigure.Container>
    <div className="thumbnail_upload_section">
      <h2>포스트 썸네일</h2>
      <div />
    </div>
    <div className="post_summary_section">
      <h2>글 요약</h2>
      <div />
    </div>
    <div className="post_utils_section">
      <button type="button">취소</button>
      <button type="button">포스트</button>
    </div>
  </StyledCreatePostConfigure.Container>
);

export default CreatePostConfigure;
