import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper';
import ColorSet from '@/styles/colorSet';

interface ThumbnailProps {
  thumbnailUrl: string;
}

const StyledView = {
  HeadLine: styled.section<ThumbnailProps>`
    position: relative;
    padding: 5rem 1rem 1rem 1rem;
    z-index: 0;
    height: 100vh;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3)),
    url(${(props) => props.thumbnailUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    ${mediaQueryHelper('medium')} {
      padding-top: 6rem;
    }

    ${mediaQueryHelper('large')} {
      padding-top: 7rem;
    }

    h1 {
      position: absolute;
      font-weight: bold;
      color: ${ColorSet['--white']};
      font-size: 1.5rem;
      bottom: 30%;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      ${mediaQueryHelper('medium')} {
        font-size: 2rem;
      }

      ${mediaQueryHelper('large')} {
        font-size: 3.5rem;
      }
    }

    .head_meta {
      position: absolute;
      left: 2rem;
      color: ${ColorSet['--white']};
      .username {
        padding-right: 1rem;
        border-right: 1px solid ${ColorSet['--white']};
        .user_link {
          color: ${ColorSet['--white']};
        }
      }

      .meta_btn {
        margin-left: 1rem;
        font-size: 1.1rem;
        cursor: pointer;
      }
    }
  `,
  Container: styled.div`
    width: 100%;
    background-color: ${ColorSet['--white']};
  `,
  Content: styled.div`
    max-width: 1000px;
    padding: 2rem 1rem;
    margin: 0 auto;
  `,
  PostUtilContainer: styled.div`
    max-width: 1000px;
    margin: 0 auto;
  `,
  CommentContainer: styled.div`
    max-width: 1000px;
    margin: 0 auto;
  `,
};

export default StyledView;
