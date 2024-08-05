import axios from 'axios';

import { instance } from '@/lib/axios';

import { PostNickname, PostSendmail, PostSignin, PostSignup, PostVerify } from '@/types/auths';

export const postSignup = async (value: PostSignup) => {
  const res = await instance.post('/auths/signup', value);
  return res.data;
};

export const postSendmail = async (value: PostSendmail) => {
  const res = await instance.post('/auths/sendmail', value);
  return res.data;
};

export const postVerify = async (value: PostVerify) => {
  const res = await instance.post('/auths/verify', value);
  return res.data;
};

export const postNickname = async (value: PostNickname) => {
  const res = await instance.post('/auths/nickname', value);
  return res.data;
};

export const postSignin = async (value: PostSignin) => {
  const res = await instance.post('/auths/signin', value);
  return res.data;
};

export const postSignout = async () => {
  const res = await instance.post('/auths/signout');
  return res.data;
};

export const postRefreshtoken = async () => {
  const res = await axios.post(
    'https://hobbyzone.p-e.kr/auths/refreshtoken',
    {},
    { withCredentials: true },
  );
  return res.data;
};
