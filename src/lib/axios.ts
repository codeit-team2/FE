import { postRefreshtoken } from '@/apis/auths';

import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (!accessToken && refreshToken) {
      const result = await postRefreshtoken();
      deleteCookie('accessToken');
      setCookie('accessToken', result.accessToken, {
        path: '/',
        maxAge: 12 * 60 * 60,
      });
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error),
);
