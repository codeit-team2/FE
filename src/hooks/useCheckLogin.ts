import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';
import Router from 'next/router';

export default function useCheckLogin() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  useEffect(() => {
    if (!getCookie('accessToken')) {
      Router.push('/');
      console.log('로그인이 필요하다는 모달 추후 제작');
      setIsLogin(false);
    }
  }, []);
  return isLogin;
}
