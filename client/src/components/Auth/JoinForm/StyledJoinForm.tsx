import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledJoinForm = {
  Container: styled.div`
    display: flex;
    border-radius: 50px;
    padding: 1rem;
    margin-top: 5rem;
    width: 1000px;
    height: 800px;
  `,
  Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${ColorSet['--white']};
    padding: 2rem;
    .form_head {
      h1 {
        font-weight: bold;
      }
      span {
        font-weight: lighter;
        line-height: 3rem;
      }
    }

    .join_input {
      padding: .8rem 1rem;
      font-size: 1rem;
      outline: none;
      border-radius: 6px;
      border: 1px solid ${ColorSet['--greyOpacity200']};
    }

    .form_error {
      color: ${ColorSet['--red500']};
      margin-top: 10px;
    }

    label {
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    
    .join_btn {
      margin-top: 3rem;
      background-color: ${ColorSet['--primary']};
      color: ${ColorSet['--white']};
      height: 2.5rem;
      border-radius: 6px;
      font-weight: bold;
    }
    .go_to_login {
      margin-top: 1rem;
    }

    ${mediaQueryHelper('medium')} {
      width: 50%;
    }
  `,
  Info: styled.div`
    display: none;
    position: relative;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)),
    url("https://velog.velcdn.com/images/hjh040302/post/62d40f5f-0c9a-4a1b-94b9-4f61489f212d/image.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: end;

    .info_text {
      position: absolute;
      font-weight: bold;
      bottom: 5rem;
      left: 1rem;
      font-size: 32px;
      color: ${ColorSet['--white']}
    }

    ${mediaQueryHelper('medium')} {
      width: 50%;
      display: flex;
    }
  `,
}

export default StyledJoinForm;
