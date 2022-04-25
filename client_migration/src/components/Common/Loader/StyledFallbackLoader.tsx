import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledFallbackLoader = {
  SkeletonView: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;;
    transition: 0.3s;
    padding: 0 1rem;
    width: 100%;

    ${mediaQueryHelper('medium')} {
      width: 50%;
    }

    ${mediaQueryHelper('large')} {
      width: 33.333333%;
    }

    @-webkit-keyframes skeleton-gradient {
      0% {
          background-color: rgba(165, 165, 165, 0.1);
      }

      50% {
          background-color: rgba(165, 165, 165, 0.3);
      }

      100% {
          background-color: rgba(165, 165, 165, 0.1);
      }
    }

    @keyframes skeleton-gradient {
        0% {
            background-color: rgba(165, 165, 165, 0.1);
        }

        50% {
            background-color: rgba(165, 165, 165, 0.3);
        }

        100% {
            background-color: rgba(165, 165, 165, 0.1);
        }
    }
  `,
    Thumbnail: styled.figure`
    height: 0;
    padding-bottom: 60%;
    animation: skeleton-gradient 1.8s infinite ease-in-out;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 20px 20px 0 0 ;
    `,
    Content: styled.div`
      flex-grow: 1;
      height: 150px;
    `,
    ContentLine: styled.div`
      border-radius: 50%;
      animation: skeleton-gradient 1.8s infinite ease-in-out;
    `,
    Meta: styled.div`
      display: flex;
      align-items: center;
      padding: 0 1rem 1rem 1rem;
      border-radius: 0 0 20px 20px;
      height: 50px;
      animation: skeleton-gradient 1.8s infinite ease-in-out;
    `,
    PostList: styled.div`
      display: flex;
      flex-wrap: wrap;
      margin-left: -1rem;
      margin-right: -1rem;
      padding: 4rem 1rem 1rem 1rem;

      ${mediaQueryHelper('medium')} {
        padding-top: 6rem;
      }

      ${mediaQueryHelper('large')} {
        padding-top: 8rem;
      }

    `
}

export default StyledFallbackLoader;
