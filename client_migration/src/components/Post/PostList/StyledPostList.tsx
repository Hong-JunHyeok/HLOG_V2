import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper'

const StyledPostList = {
  Container: styled.section`
    overflow-x: hidden;
  `,
  PostList: styled.div`
    display: flex;
    padding: 1rem;
    background-color: ${ColorSet['--grey200']};
    flex-wrap: wrap;
    
    ${mediaQueryHelper('medium')} {
      display: flex;
      margin: 0 -1rem;
      overflow-x: hidden;
    }

    ${mediaQueryHelper('large')} {
      display: flex;
      margin: 0 -1rem;
    }
  `
}

export default StyledPostList;
