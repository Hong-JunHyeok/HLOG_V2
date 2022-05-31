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
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  `,
  Section: styled.section`
    width: 100%;
    padding: 1rem 0;
    margin: 1rem 0;
    background-color: ${ColorSet['--white']};
    padding: 1rem;
    border-radius: 10px;
    .section_title {
      font-weight: bold;
      margin-bottom: 1rem;
    }
    label {
      display: flex;
      align-items: center;
      .label {
        width: 120px;
        font-weight: bold;
      }
      .value {
        width: calc(100% - 100px);
        margin-left: 1rem;
      }
    }
    .edit {
      width: 100%;
      color: ${ColorSet['--primary']};
      display: flex;
      justify-content: flex-end;
      & > button {
        color: ${ColorSet['--primary']};
        text-decoration: underline;
        cursor: pointer;
      }
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
    svg {
      width: 120px;
      height: 120px;
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
  Meta: styled.div`
    .meta_input {
      width: 100%;
      border: 1px solid ${ColorSet['--greyOpacity200']};
      padding: .5rem 1rem;
      border-radius: 10px;
      outline: none;
      transition: ease-in .2s;
      height: 3rem;
      &:focus {
        border: 1px solid ${ColorSet['--primary']};
      }
    }
  `,
};

export default StyledProfileForm;
