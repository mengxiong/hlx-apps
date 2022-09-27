import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AxiosInstance } from 'axios';
import { AuthProvider } from './AuthProvider';
import { RequestInterceptor } from './RequestInterceptor';

// 如果用 BrowserRouter 需要 basename
// const basename = import.meta.env.BASE_URL
export interface AppProps {
  routes: RouteObject[];
  request: AxiosInstance;
}

export function App({ routes, request }: AppProps) {
  return (
    <AuthProvider>
      <SnackbarProvider
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
      <RequestInterceptor request={request} />
      <RouterProvider router={createHashRouter(routes)} />
    </AuthProvider>
  );
}
