import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

interface ThumbnailProps {
  thumbnailUrl: string;
}

const StyledPostItem = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    ${mediaQueryHelper('medium')} {
      width: 50%;
      padding: 0 1rem;
    }

    ${mediaQueryHelper('large')} {
      width: 33.333333%;
    }

    ${mediaQueryHelper('huge')} {
      width: 20%;
    }
  `,
  Thumbnail: styled.figure<ThumbnailProps>`
    height: 0;
    padding-bottom: 60%;
    background-image: url(${(props) => props.thumbnailUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
  Content: styled.div`
    padding: 1rem;
    background-color: ${ColorSet['--white']};
    flex-grow: 1;
    background-color: white;
    padding: 1em;
  `
}

export default StyledPostItem;
