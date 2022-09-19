import { AxiosInstance } from 'axios';
import { useLayoutEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from './AuthContext';

export interface RequestInterceptorProps {
  children: React.ReactElement;
  request: AxiosInstance;
}

export function RequestInterceptor({ children, request }: RequestInterceptorProps) {
  const { getToken, signout } = useAuth();

  useLayoutEffect(() => {
    request.interceptors.request.use((config) => {
      const token = getToken();
      if (token && token.accessToken) {
        config.headers!['x-Authorization'] = token.accessToken;
      }
      return config;
    });
    request.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        const msg = err.response?.data?.message || err.message;
        if (err.response?.status === 401) {
          signout();
        }
        enqueueSnackbar(msg, { variant: 'error' });
        return Promise.reject(err);
      }
    );
  }, []);

  return children;
}
