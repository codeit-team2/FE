import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error),
);
