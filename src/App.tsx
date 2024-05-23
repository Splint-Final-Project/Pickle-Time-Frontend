import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import globalStyle from '@/styles/globalStyle';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
