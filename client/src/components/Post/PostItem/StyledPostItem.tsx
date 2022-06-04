import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

interface ThumbnailProps {
  thumbnailUrl: string;
}

interface ProfileProps {
  profileUrl?: string;
}

const StyledPostItem = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    cursor: pointer;

    ${mediaQueryHelper('medium')} {
      &:hover {
        transform: translateY(-5px);
      }
    }
  `,
  Thumbnail: styled.figure<ThumbnailProps>`
    height: 0;
    padding-bottom: 60%;
    background-image: url(${(props) => props.thumbnailUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0 ;
  `,
  Content: styled.div`
    background-color: ${ColorSet['--white']};
    flex-grow: 1;
    background-color: white;
    padding: 1em;

    h1 {
      font-size: 18px;
      font-weight: bold;
    }
    p {
      font-weight: lighter;
    }
  `,
  Meta: styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 0 1rem 1rem 1rem;
    border-radius: 0 0 10px 10px;
    svg {
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
  `,
  ProfileContainer: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    `,
  Viewer: styled.div`
    display: flex;
    align-items: center;
    font-size: .8rem;
    margin-left: auto;
    svg {
      width: .8rem;
      height: .8rem;
      margin-right: 10px;
    }   
    `,
  Like: styled.div`
    margin-left: 1rem;
    svg {
      width: .8rem;
      height: .8rem;
      margin-right: 10px;
    }   
  `,
  Figure: styled.figure<ProfileProps>`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.profileUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
};

export default StyledPostItem;
