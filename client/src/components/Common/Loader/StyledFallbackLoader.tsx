import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper';
import ColorSet from '@/styles/colorSet';

const StyledFallbackLoader = {
  PostSkeletonView: styled.div`
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
    border-radius: 10px 10px 0 0 ;
    `,
  Content: styled.div`
      flex-grow: 1;
      height: 150px;
      padding: 1em;
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
      padding: 1rem;
      margin-left: -1rem;
      margin-right: -1rem;
    `,
  CommentList: styled.div``,

  CommentSkeletonView: styled.div`
    animation: skeleton-gradient 1.8s infinite ease-in-out;
    border-bottom: 1px solid ${ColorSet['--grey200']};
    padding: 2rem 0rem;
    .reply_button {
      margin-bottom: 1rem;
      width: 50px;
      display: flex;
      justify-content: space-between;
    }
    .active {
      color: ${ColorSet['--primary']};
    }
 `,
  PostView: styled.main``,
  HeadLine: styled.section`
  position: relative;
    padding: 5rem 1rem 1rem 1rem;
    z-index: 0;
    height: 100vh;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    ${mediaQueryHelper('medium')} {
      padding-top: 6rem;
    }

    ${mediaQueryHelper('large')} {
      padding-top: 7rem;
    }
  `,
};

export default StyledFallbackLoader;
