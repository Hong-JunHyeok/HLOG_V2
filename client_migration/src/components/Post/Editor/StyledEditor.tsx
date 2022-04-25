import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import mediaQueryHelper from '@/styles/mediaHelper';

const StyledEditor = {
  Container: styled.div`
  .RichEditor-root {
    background: #fff;
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 15px;
  }

  .RichEditor-editor {
    border-top: 1px solid #ddd;
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
  }

  .RichEditor-editor .public-DraftEditorPlaceholder-root,
  .RichEditor-editor .public-DraftEditor-content {
    margin: 0 -15px -15px;
    padding: 15px;
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

  .RichEditor-editor .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
    font-size: 16px;
    padding: 20px;
  }

  .RichEditor-controls {
    font-family: 'Helvetica', sans-serif;
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;
  }

  .block_controls {
    display: inline-block;
    ${mediaQueryHelper('medium')} {
      border-right: 1px solid ${ColorSet['--greyOpacity400']};
    }
  }
  .inline_controls {
    display: inline-block;
    ${mediaQueryHelper('medium')} {
      margin-left: 1rem;
    }
  }

  .RichEditor-styleButton {
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
  }

  .RichEditor-activeButton {
    color: ${ColorSet['--primary']};
  }

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
