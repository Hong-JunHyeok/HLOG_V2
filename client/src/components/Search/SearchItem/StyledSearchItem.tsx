import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

interface ThumbnailProps {
  thumbnailUrl: string;
}

const StyledSearchItem = {
  Container: styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    background-color: ${ColorSet['--white']};
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: ${ColorSet['--greyOpacity100']};
    }
    .title {
      font-weight: bold;
      font-size: 1.2rem;
      margin: 1rem 0;
    }
    .username {
      color: ${ColorSet['--greyOpacity600']};
      margin-top: auto;
    }
  `,
  Thumbnail: styled.figure<ThumbnailProps>`
    width: 120px;
    height: 100%;
    background-image: url(${(props) => props.thumbnailUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
  Meta: styled.div`
    display: flex;
    height: 100%;
    justify-content: : center;
    flex-direction: column;
    margin-left: 1rem;
  `,
};

export default StyledSearchItem;
