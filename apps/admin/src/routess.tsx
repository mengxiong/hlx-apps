import { RouteObject } from 'react-router-dom';
import { AuthRequired } from '@hlx/frame';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LoginPage } from './pages/login';
import { Layout } from './layout/Layout';
import { CreateTextbook } from './pages/textbook/CreateTextbook';

export interface RouteHandle {
  nav?: string;
  icon?: React.ReactNode;
  breadcrumb?: string | boolean;
}

declare module 'react-router-dom' {
  interface RouteObject {
    handle?: RouteHandle;
  }
}

// TODO: 不使用 antd, 不好看, 和mui切换不好用

export const routes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <AuthRequired>
        <Layout />
      </AuthRequired>
    ),
    children: [
      {
        path: 'textbook',
        element: <CreateTextbook />,
        handle: {
          nav: '课程管理',
          icon: <MenuBookIcon />,
          breadcrumb: true,
        },
      },
    ],
  },
];
