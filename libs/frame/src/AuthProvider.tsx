import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { Token } from '@hlx/dto';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const authLocalKey = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, removeToken] = useLocalStorage(authLocalKey);
  const navigate = useNavigate();
  const location = useLocation();

  const signin = useCallback((value: Token) => {
    setToken(value);
    const from = (location.state as any)?.from || '/';
    navigate(from, { replace: true });
  }, []);

  const signout = useCallback(() => {
    removeToken();
  }, [removeToken]);

  const value = useMemo(
    () => ({
      token,
      signin,
      signout,
    }),
    [token, signin, signout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
