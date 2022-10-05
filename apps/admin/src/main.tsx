import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from '@hlx/frame';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { routes } from './routess';
import { request } from './request';
import { Theme } from './theme';

// TODO: 不使用 antd, 不好看, 和mui切换不好用

const element = document.getElementById('root')!;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <CssBaseline />
        <App routes={routes} request={request} />
      </Theme>
    </QueryClientProvider>
  </React.StrictMode>
);
