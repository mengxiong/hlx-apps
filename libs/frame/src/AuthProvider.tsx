import { useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { AuthContext } from './AuthContext';

const authLocalKey = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, signin, signout] = useLocalStorage(authLocalKey);

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
