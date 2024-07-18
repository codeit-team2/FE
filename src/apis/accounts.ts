import { instance } from '@/lib/axios';

import { PostAccounts } from '@/types/accounts';

export const getAccounts = async () => {
  const res = await instance.get('/accounts/info');
  return res.data;
};

export const postAccounts = async (value: PostAccounts) => {
  const res = await instance.post('/accounts/info', value);
  return res.data;
};
