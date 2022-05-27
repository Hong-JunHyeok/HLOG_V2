import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

interface ProfileProps {
  profileUrl?: string;
}

const StyledProfileForm = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 100%;
    padding: 1rem 0;
    margin: 1rem 0;
    border-top: 1px solid ${ColorSet['--greyOpacity200']};
    border-bottom: 1px solid ${ColorSet['--greyOpacity200']};
    .action_button {
      text-decoration: underline;
    }
    .edit {
      font-size: 1rem;
      color: ${ColorSet['--primary']};
    }
    .warning {
      color: ${ColorSet['--red400']};
    }
    .delete_user {
      background-color: ${ColorSet['--red400']};
      color: ${ColorSet['--white']};
      width: 100%;
      bottom: 1rem;
      padding: .3rem 0;
      font-size: 1rem;
    }
    
  `,
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .profile_edits {
      display: flex;
      margin-top: 1rem;
      flex-direction: column;
      #profile_input {
        display: none;
      }
      .profile_edit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 4px;
        padding: 0px 1.25rem;
        height: 2rem;
        font-size: .8rem;
      }
      .primary {
        background: ${ColorSet['--primary']};
        color: ${ColorSet['--white']};
      }
    }
  `,
  Profile: styled.figure<ProfileProps>`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    background-image: url(${(props) => props.profileUrl});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,
  Meta: styled.div``,
};

export default StyledProfileForm;
