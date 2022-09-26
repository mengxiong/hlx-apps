import React from 'react';
import { Token } from '@hlx/dto';

interface AuthContextType<T = any> {
  token: T;
  signin: (token: T) => void;
  signout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth<T = Token>(): AuthContextType<T> {
  return React.useContext(AuthContext);
}
