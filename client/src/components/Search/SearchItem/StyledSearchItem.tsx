import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

interface ThumbnailProps {
  thumbnailUrl: string;
}

const StyledSearchItem = {
  Container: styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    background-color: ${ColorSet['--white']};
    cursor: pointer;
    &:hover {
      background-color: ${ColorSet['--greyOpacity100']};
    }
    .title {
      font-weight: bold;
    }
    .username {
      color: ${ColorSet['--greyOpacity600']};
    }
  `,
  Thumbnail: styled.figure<ThumbnailProps>`
    width: 100px;
    height: 50px;
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
