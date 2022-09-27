import { RouteObject } from 'react-router-dom';
import { AuthRequired } from '@hlx/frame';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LoginPage } from './pages/login';
import { Layout } from './layout/Layout';
import { CreateTextbook } from './pages/textbook/CreateTextbook';

export interface SidebarMetadata {
  name: string;
  icon?: React.ReactNode;
}

declare module 'react-router-dom' {
  interface RouteObject {
    handle?: {
      sidebar?: SidebarMetadata;
      breadcrumbName?: string;
    };
  }
}

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
        handle: { sidebar: { name: '课程管理', icon: <MenuBookIcon /> } },
      },
    ],
  },
];
