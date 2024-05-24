import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Router from "./Router";
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import globalStyle from '@/styles/globalStyle';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}
