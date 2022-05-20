import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper'
import ColorSet from '@/styles/colorSet';

const StyledPostList = {
  Container: styled.section`
    overflow-x: hidden;
    min-height: 90vh;

    ${mediaQueryHelper('medium')} {
      overflow-x: hidden;
    }
  `,
  PostMenu: styled.div`
    display: flex;
    padding: 5rem 1rem 1rem 1rem;

    ${mediaQueryHelper('medium')} {
      padding-top: 6rem;
    }

    ${mediaQueryHelper('large')} {
      padding-top: 7rem;
    }

    & > li {
      list-style: none;
      display: flex;
      align-items: center;
      padding: 0 8px;
      color: ${ColorSet['--grey700']};
      & > a {
        padding: 12px 10px;
        font-size: 15px;
        line-height: 20px;
        color: currentColor;
        border-radius: 8px;
        border: 0;
        cursor: pointer;
        background-color: transparent;
        text-decoration: none;
        text-align: left;
        &:hover {
          background-color: ${ColorSet['--greyOpacity100']}
        }
      }
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
