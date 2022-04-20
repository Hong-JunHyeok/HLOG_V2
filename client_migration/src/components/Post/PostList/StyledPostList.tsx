import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper'

const StyledPostList = {
  Container: styled.section`
    overflow-x: hidden;

    ${mediaQueryHelper('medium')} {
      overflow-x: hidden;
    }
  `,
  PostList: styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;

    ${mediaQueryHelper('medium')} {
      margin-left: -1rem;
      margin-right: -1rem;
    }

    ${mediaQueryHelper('large')} {

    }
  `
}

export default StyledPostList;
