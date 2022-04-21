import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledEditor = {
  Container: styled.div`
    height: 100%;

    .title-input {
      width: 100%;
      border: none;
      margin: 4rem 0 1rem 0;
      outline: none;
      resize: none;
      font-size: 48px;
      font-weight: bold;
      height: 1.2rem;

      &::placeholder {
        font-size: 48px;
        font-weight: bold;
      }
    }

    .DraftEditor-root {
      background-color: ${ColorSet['--white']};
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }

    .DraftEditor-editorContainer,
    .public-DraftEditor-content {
      height: 100%;
      padding-top: 1rem;
    }
  `,
  ToolContainer: styled.ul`
    display: flex;
    flex-wrap: wrap;
    background-color: ${ColorSet['--white']};
    border-bottom: 1px solid ${ColorSet['--greyOpacity200']};
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
}

export default StyledEditor;
