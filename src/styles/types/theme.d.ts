import '@emotion/react';

type color =
  | 'white'
  | 'black'
  | 'basic'
  | 'sub'
  | 'line'
  | 'primary'
  | 'primaryDark'
  | 'primaryDeepDark'
  | 'secondary'
  | 'secondary2'
  | 'inputBox'
  | 'inputText'
  | 'card'
  | 'error'
  | 'selected'
  | 'category'
  | 'accent1'
  | 'accent2'
  | 'background';

type typography =
  | 'header'
  | 'title'
  | 'title2'
  | 'title3'
  | 'subTitle1'
  | 'subTitle2'
  | 'subTitle3'
  | 'subTitle4'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'detail'
  | 'price'
  | 'tab'
  | 'caption'
  | 'terms'
  | 'chat';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      [key in color]: string;
    };
    typography: {
      [key in typography]: {
        fontSize: string;
        fontWeight: number;
        lineHeight?: string | number;
      };
    };
    border: string;
  }
}
