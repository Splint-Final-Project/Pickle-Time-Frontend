import reset from 'emotion-reset';
import { css } from '@emotion/react';
import theme from '@/styles/theme';

const globalStyle = css`
  ${reset}

  * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-decoration: none;
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-weight: 400;
    font-size: 1.6rem;
    color: ${theme.color.black};
    max-width: 100%;
    min-height: calc(var(--vh, 1vh) * 100);
    overflow-x: hidden;
    background-color: ${theme.color.white};
    text-underline-position: under;
  }

  div,
  span {
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
  }

  button {
    padding: 0;
    border: none;
    cursor: pointer;
    background: transparent;
  }

  img,
  a {
    cursor: pointer;
    /* user-drag: none; */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    outline: none;
  }

  textarea {
    outline: none;
    resize: none;
  }

  //스크롤바 없애는 이유: 스크롤바가 생겼다가 없어졌다 할 때 레이아웃이 흔들림
  * {
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  [disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export default globalStyle;
