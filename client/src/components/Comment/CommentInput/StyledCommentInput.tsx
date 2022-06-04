import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const StyledCommentInput = {
  Container: styled.form`
    width: 100%;
    display: flex;
    position: relative;
    display: flex;
    align-items: center; 
    justify-content: center;
    padding: 1rem;

    .comment_input {
      border-radius: 10px;
      position: relative;
      width: 100%;
      padding: 1rem 4rem 1rem 1rem;
      height: 2.5rem;
      outline: none;
      border: none;
      background-color: rgb(241, 243, 245);
      color: ${ColorSet['--grey800']};
      font-size: .9rem;
    }

    .comment_button {
      position: absolute;
      right: 1.5rem;
      font-size: 1.4rem;
      padding: 0px;
      cursor: pointer;
      color: ${ColorSet['--primary']};
    }
  `,
  LoginRequireModal: styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .require_content {
      font-size: 1.3rem;
     & > .decoration {
       color: ${ColorSet['--primary']};
       font-weight: bold;
     } 
    }
    button {
      margin-top: 1rem;
      width: 50px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${ColorSet['--white']};
      background-color: ${ColorSet['--primary']};
      border-radius: 10px;
    }
  `,
};

export default StyledCommentInput;
