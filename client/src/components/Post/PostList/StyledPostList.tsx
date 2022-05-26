import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper'

const StyledPostList = {
  Container: styled.section`
    min-height: 90vh;
  `,
  
  PostList: styled.div`
    display: grid;
    grid-template-columns: 1fr;

    margin-bottom: 1.4rem;
    column-gap: 1.4rem;
    row-gap: 1.4rem;

    ${mediaQueryHelper('medium')} {
      grid-template-columns: repeat(2, 1fr)
    }

    ${mediaQueryHelper('large')} {
      grid-template-columns: repeat(3, 1fr)
    }
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
