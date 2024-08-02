import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
