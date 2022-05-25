import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper'

const StyledPostList = {
  Container: styled.section`
    overflow-x: hidden;
    min-height: 90vh;

    ${mediaQueryHelper('medium')} {
      overflow-x: hidden;
    }
  `,
  
  PostList: styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    margin-left: -1rem;
    margin-right: -1rem;
  `,
  NoContent: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;

    &::after {
      content: "이런... 게시글이 없습니다."
    }
`,
}

export default StyledPostList;
