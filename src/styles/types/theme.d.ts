import '@emotion/react';

type color =
  | 'white'
  | 'black'
  | 'basic'
  | 'sub'
  | 'line'
  | 'primary'
  | 'secondary'
  | 'inputBox'
  | 'inputText'
  | 'card'
  | 'error';

type typography =
  | 'header'
  | 'title'
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
  | 'caption';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      [key in color]: string;
    };
    typography: {
      [key in typography]: {
        fontSize: string;
        fontWeight: number;
        lineHeight?: string;
      };
    };
    border: string;
  }
}
