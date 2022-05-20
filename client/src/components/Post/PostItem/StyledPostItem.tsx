import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

interface ThumbnailProps {
  thumbnailUrl: string;
}

interface MetaProps {
  profileUrl?: string;
}

const StyledPostItem = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;;
    transition: 0.3s;
    padding: 0 1rem;

    ${mediaQueryHelper('medium')} {
      width: 50%;
    }

    ${mediaQueryHelper('large')} {
      width: 33.333333%;
    }
  `,
  Thumbnail: styled.figure<ThumbnailProps>`
    height: 0;
    padding-bottom: 60%;
    background-image: url(${(props) => props.thumbnailUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 20px 20px 0 0 ;
  `,
  Content: styled.div`
    background-color: ${ColorSet['--white']};
    flex-grow: 1;
    background-color: white;
    padding: 1em;

    h1 {
      font-size: 38px;
      font-weight: bold;
    }
    p {
      font-weight: lighter;
    }
  `,
  Meta: styled.div<MetaProps>`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 0 1rem 1rem 1rem;
    border-radius: 0 0 20px 20px;
    figure, svg {
      background-image: url(${(props) => props.profileUrl});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    span {
      margin-left: .5rem;
      font-weight: bold;
    }
    p {
      font-weight: lighter;
    }
    .view-button {
      margin-left: auto;
      display: flex;

      button {
        background-color: ${ColorSet['--grey800']};
        color: ${ColorSet['--white']};
        padding: .5rem;
        &:first-of-type {
          border-radius: 8px;
          padding: 0 .5rem;
          margin-right: 1rem;
          ${mediaQueryHelper('medium')} {
            margin-right: 0;
            border-right: 1px solid ${ColorSet['--whiteOpacity300']};
            border-radius: 8px 0 0 8px;
          }
        }
        &:last-of-type {
          font-size: .8rem;
          border-radius: 8px;

          ${mediaQueryHelper('medium')} {
            margin-right: 0;
            border-right: 1px solid ${ColorSet['--whiteOpacity300']};
            border-radius: 0 8px 8px 0; 
          }
        }
      }
    }
  `
}

export default StyledPostItem;
