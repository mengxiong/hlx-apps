import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from '@hlx/frame';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { routes } from './routess';
import { request } from './request';

const element = document.getElementById('root')!;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App routes={routes} request={request} />
    </QueryClientProvider>
  </React.StrictMode>
);
