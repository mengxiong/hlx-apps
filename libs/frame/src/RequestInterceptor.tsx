import { AxiosInstance } from 'axios';
import { useLayoutEffect, useRef } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from './AuthContext';

export interface RequestInterceptorProps {
  request: AxiosInstance;
}

export function RequestInterceptor({ request }: RequestInterceptorProps) {
  const { token, signout } = useAuth();

  const tokenRef = useRef(token);
  useLayoutEffect(() => {
    tokenRef.current = token;
  });

  useLayoutEffect(() => {
    const requestInterceptor = request.interceptors.request.use((config) => {
      const currentToken = tokenRef.current;
      if (currentToken && currentToken.accessToken) {
        config.headers!.authorization = `${currentToken.tokenType} ${currentToken.accessToken}`;
      }
      return config;
    });
    const responseInterceptor = request.interceptors.response.use(
      (res) => {
        return Promise.resolve(res.data);
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
    return () => {
      request.interceptors.request.eject(requestInterceptor);
      request.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return null;
}
