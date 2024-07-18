import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  accessToken: string;
  user: {
    email: string;
    nickname: string;
    profileImageUrl: string;
  };
}

interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

// 초기 값 정의
const initialAuthState: AuthContextType = {
  auth: { accessToken: '', user: { email: '', nickname: '', profileImageUrl: '' } },
  setAuth: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthState);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthState>({
    accessToken: '',
    user: { email: '', nickname: '', profileImageUrl: '' },
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
