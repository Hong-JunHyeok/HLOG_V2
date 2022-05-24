import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper'
import ColorSet from '@/styles/colorSet';

interface ThumbnailProps {
  thumbnailUrl: string;
}

const StyledView = {
  Container: styled.div`
  `,
  HeadLine: styled.section<ThumbnailProps>`
    position: relative;
    z-index: -1;
    padding: 5rem 1rem 1rem 1rem;
    height: 100vh;
    background-image: 
    linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3)),
    url(${(props) => props.thumbnailUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: black;
    
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
  `,
}

export default StyledView;
