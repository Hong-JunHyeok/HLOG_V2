import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

const ResetStyle = () => {
  return <Global styles={css`
    ${emotionReset}

    *, *::after, *::before {
      box-sizing: border-box;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
    }
  `} />
}

export default ResetStyle;
