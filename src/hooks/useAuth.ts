import { AuthContext } from '@/context/AuthContext';

import { Dispatch, SetStateAction, useContext } from 'react';

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

const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export default useAuth;
