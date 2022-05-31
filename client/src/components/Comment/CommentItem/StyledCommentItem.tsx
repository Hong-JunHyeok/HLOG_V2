import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

interface ProfileProps {
  profileUrl?: string;
}

const StyledCommentItem = {
  Container: styled.div`
    border-bottom: 1px solid ${ColorSet['--grey200']};
    padding: 2rem 0rem;
  `,
  Meta: styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
    .meta_info {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
      .comment_username {
        font-weight: bold;
      }
      .edit_comment_input {
        border: 1px solid ${ColorSet['--greyOpacity200']};
        padding: .5rem 1rem;
        border-radius: 10px;
        outline: none;
        transition: ease-in .2s;
        &:focus {
          border: 1px solid ${ColorSet['--primary']};
        }
      }
      .comment_content {
        margin: 0;
      }
    }
  `,
  ProfileContainer: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  `,
  Figure: styled.figure<ProfileProps>`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.profileUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
  Setting: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};

export default StyledCommentItem;
