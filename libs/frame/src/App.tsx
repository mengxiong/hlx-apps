import { HashRouter, RouteObject } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AxiosInstance } from 'axios';
import { AuthProvider } from './AuthProvider';
import { RequestInterceptor } from './RequestInterceptor';
import { Routes } from './Routes';

// 如果用 BrowserRouter 需要 basename
// const basename = import.meta.env.BASE_URL
export interface AppProps {
  routes: RouteObject[];
  basename?: string;
  request: AxiosInstance;
}

export function App({ routes, request, basename = '/' }: AppProps) {
  return (
    <HashRouter basename={basename}>
      <AuthProvider>
        <RequestInterceptor request={request}>
          <Routes routes={routes}></Routes>
        </RequestInterceptor>
      </AuthProvider>
      <SnackbarProvider
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      ></SnackbarProvider>
    </HashRouter>
  );
}
