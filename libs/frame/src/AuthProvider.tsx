import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import { AuthContext } from './AuthContext';

const authLocalKey = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, removeToken] = useLocalStorage(authLocalKey);

  const tokenRef = useRef(token);

  useLayoutEffect(() => {
    tokenRef.current = token;
  });

  const getToken = useCallback(() => tokenRef.current, []);

  const value = useMemo(
    () => ({
      token,
      getToken,
      signin: setToken,
      signout: removeToken,
    }),
    [token, getToken, setToken, removeToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
