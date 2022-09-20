import { RouteObject } from 'react-router-dom';
import { AuthRequired } from '@hlx/frame';
import { LoginPage } from './page/login';
import { Layout } from './page/layout/Layout';

export const routes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <AuthRequired>
        <Layout />
      </AuthRequired>
    ),
    children: [],
  },
];
