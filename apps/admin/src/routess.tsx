import { RouteObject } from 'react-router-dom';
import { AuthRequired } from '@hlx/frame';
import { LoginPage } from './pages/login';
import { Layout } from './layout/Layout';
import { CreateTextbook } from './pages/textbook/CreateTextbook';

export const routes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <AuthRequired>
        <Layout />
      </AuthRequired>
    ),
    children: [{ path: 'textbook', element: <CreateTextbook /> }],
  },
];
