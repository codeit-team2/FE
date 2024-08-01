import { useAuth } from '@/context/AuthProvider';

import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import LoginRequired from '@/components/common/Modal/LoginRequired';

export default function useCheckLogin() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const { isLogin, setIsLogin } = useAuth();

  useEffect(() => {
    if (!getCookie('accessToken')) {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  return !isLogin ? (
    <LoginRequired isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  ) : null;
}
