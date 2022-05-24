import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import ColorSet from '@/styles/colorSet';

const ResetStyle = () => {
  return <Global styles={css`
    ${emotionReset}

    *, *::after, *::before {
      box-sizing: border-box;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
    }

    html {
    font-family: 'Apple SD Gothic Neo', Roboto, 'Noto Sans KR', NanumGothic, 'Malgun Gothic', sans-serif;
    color: #555;
    line-height: 1.2;
    word-wrap: break-word;
    }
    
    textarea {
        font-family: 'Apple SD Gothic Neo', Roboto, 'Noto Sans KR', NanumGothic, 'Malgun Gothic', sans-serif;
    }

    body {
        background: #eee;
        -webkit-font-smoothing: antialiased;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
    }
    article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
        display: block;
    }
    div, span, article, section, header, footer, aside, p, ul, li, fieldset, legend, label, a, nav, form {
        box-sizing: border-box;
        /* content-box */
    }
    ol, ul, li {
        list-style: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    img {
        max-width: 100%;
        height: auto;
        border: 0;
    }
    a {
        display: inline-block;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }

    h1 {
        font-size: 2em
    }
    h2 {
        font-size: 1.4em;
    }
    h3 {
        font-size: 1.17em;
    }
    h4 {
        font-size: 1em;
    }
    h5 {
        font-size: .83em;
    }
    h6 {
        font-size: .67em;
    }

    .hlog_blockquote {
        border-left: 4px solid #3182f6;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background: #F8F9FA;
        padding: 1rem 1rem 1rem 2rem;
    }

    a {
        color: ${ColorSet['--primary']};
        font-weight: bold;
        text-decoration: none;
    }
  `} />
}

export default ResetStyle;
