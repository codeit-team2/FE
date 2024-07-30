import {
  postNickname,
  postRefreshtoken,
  postSendmail,
  postSignin,
  postSignout,
  postSignup,
  postVerify,
} from '@/apis/auths';
import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import {
  PostNickname,
  PostSendmail,
  PostSignin,
  PostSignup,
  PostVerify,
  ResponsePostNickname,
} from '@/types/auths';

export const usePostSignup = () =>
  useMutation<PostSignup, AxiosError, PostSignup>({
    mutationFn: (value: PostSignup) => postSignup(value),
  });

export const usePostSendmail = () =>
  useMutation<string, AxiosError, PostSendmail>({
    mutationFn: (value: PostSendmail) => postSendmail(value),
  });

export const usePostVerify = () =>
  useMutation<string, AxiosError, PostVerify>({
    mutationFn: (value: PostVerify) => postVerify(value),
  });

export const usePostNickname = () => {
  return useMutation<ResponsePostNickname, AxiosError, PostNickname>({
    mutationFn: (value: PostNickname) => postNickname(value),
  });
};

export const usePostSignin = () =>
  useMutation({
    mutationFn: (value: PostSignin) => postSignin(value),
  });

export const usePostSignout = () =>
  useMutation({
    mutationFn: () => postSignout(),
  });

export const usePostRefreshtoken = () =>
  useMutation({
    mutationFn: () => postRefreshtoken(),
  });
