import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledEditor = {
  Container: styled.div`
  margin: 0 auto;

  .RichEditor-root {
    background: #fff;
    font-size: 14px;
    padding: 1rem;
    margin: 0 auto;
  }

  .RichEditor-editor {
    border-top: 1px solid #ddd;
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
  }

  .RichEditor-editor .public-DraftEditor-content {
    min-height: 100px;
  }

  .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
  }

  .RichEditor-editor .RichEditor-blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'Hoefler Text', 'Georgia', serif;
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
  }
  
  .public-DraftStyleDefault-pre {
    width: 100%;
    background-color: #282a36;
    color: #f8f8f2;
    font-family: Inconsolata, Menlo, Consolas, monospace;
    font-size: 16px;
    padding: 1rem;
  }

  .RichEditor-controls {
    font-family: 'Helvetica', sans-serif;
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;
  }

  .block_controls {
    display: inline-block;
    border-bottom: 1px solid ${ColorSet['--greyOpacity200']};

    ${mediaQueryHelper('medium')} {
      border-bottom: 0;
    }
  }

  .inline_controls {
    display: inline-block;
  }

  .RichEditor-styleButton {
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    padding: 1rem;
    display: inline-block;
    transition: ease-in .1s;
    &:hover {
      background-color: ${ColorSet['--greyOpacity100']}; 
    }
  }

  .RichEditor-activeButton {
    color: ${ColorSet['--primary']};
  }

  .title-input {
    width: 100%;
    margin-top: 2rem;
    border: none;
    outline: none;
    resize: none;
    font-size: 48px;
    font-weight: bold;
    padding: 0 1rem;
    color: ${ColorSet['--greyOpacity800']};

    &::placeholder {
      font-size: 48px;
      font-weight: bold;
    }
  }

  .DraftEditor-root {
    background-color: ${ColorSet['--white']};
    width: 100%;
    height: 100%;
  }

  .DraftEditor-editorContainer,
  .public-DraftEditor-content {
    padding-top: 1rem;
    min-height: 50vh;
  }
  `,

  ToolContainer: styled.ul`
    display: flex;
    flex-wrap: wrap;
    background-color: ${ColorSet['--white']};
  `,
  ToolItem: styled.li`
    border-radius: 5px;
    margin: 0.4rem;
    padding: 0.6rem;

    cursor: pointer;
    &:hover {
      background-color: ${ColorSet['--greyOpacity300']}
    }
  `,
  Header: styled.div`
      display: flex;
      height: 50px;
      background-color: ${ColorSet['--white']};
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
      .exit {
        padding: 0 1rem;
        border-right: 1px solid ${ColorSet['--greyOpacity200']};
      }

      .utils {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 1rem;

        .normal-button {
          border: 1px solid ${ColorSet['--greyOpacity300']};
          border-radius: 5px;
          margin-left: 0.8rem;
          padding: 0.5rem 1rem;
          background-color: ${ColorSet['--white']};
          &:hover {
            filter: brightness(80%);
          }
        }

        .post {
          background-color: ${ColorSet['--primary']};
          color: ${ColorSet['--white']};
          margin-left: 1rem;
        }
      }
  `,
};

export default StyledEditor;
