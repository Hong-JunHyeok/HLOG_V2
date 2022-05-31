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
};

export default StyledCommentInput;
