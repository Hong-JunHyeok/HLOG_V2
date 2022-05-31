import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledCreatePostConfigure = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    background-color: ${ColorSet['--whiteOpacity200']};
    display: flex;
    flex-direction: column;
    .label {
      font-size: 1rem;
      font-weight: bold;
    }
  `,

  ThumbnailSection: styled.section`
    .prev_thumbnail {
      width: 100%;
      height: 220px;
      ${mediaQueryHelper('medium')} {
        width: 400px;
      }
    }

    .upload_thumbnail {
      width: 100%;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center; 
      background-color: ${ColorSet['--greyOpacity200']};

      button[type="button"] {
        padding: .5rem;
        background-color: ${ColorSet['--white']};
        padding-left: 2rem;
        padding-right: 2rem;
        border-radius: 5px;
        font-weight: bold; 
        color: ${ColorSet['--primary']};
      }

      input[type="file"] { display: none }
    }

    .dragging {
      transition: ease-in .2s;
      background-color: ${ColorSet['--greyOpacity400']};
    }

    ${mediaQueryHelper('medium')} {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center; 
      flex-direction: column;
      .upload_thumbnail {
        width: 400px;
      }
    }
  `,
  PostSummarySecyion: styled.section`
    margin-top: 2rem;
    .summary_input {
      width: 100%;
      height: 100px;
      border: 1px solid ${ColorSet['--greyOpacity100']};
      outline: none;
      font-size: 1rem;
      padding: 1rem;
    }

    ${mediaQueryHelper('medium')} {
      width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
  `,

  PublishSection: styled.section`
    display: flex; 
    width: 100%;
    justify-content: flex-end;
    margin-top: 2rem;
    flex-direction: column;
    margin-top: auto;
    .button {
      padding: .6rem 1rem;
      font-size: 1rem;
      font-weight: bold;
      color: ${ColorSet['--primary']};
      border-radius: 5px;
    }
    .button + .primary {
      background-color: ${ColorSet['--primary']};
      color: ${ColorSet['--white']};
    }
    ${mediaQueryHelper('medium')} {
      flex-direction: row;
    }
   `,
};

export default StyledCreatePostConfigure;
