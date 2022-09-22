import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from '@hlx/frame';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { queryClient } from './queryClient';
import { routes } from './routess';
import { request } from './request';

import 'antd/dist/antd.css';

const element = document.getElementById('root')!;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <QueryClientProvider client={queryClient}>
        <App routes={routes} request={request} />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
