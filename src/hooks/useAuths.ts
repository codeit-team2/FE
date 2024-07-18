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

import { PostNickname, PostSendmail, PostSignin, PostSignup, PostVerify } from '@/types/auths';

export const usePostSignup = () =>
  useMutation({
    mutationFn: (value: PostSignup) => postSignup(value),
  });

export const usePostSendmail = () =>
  useMutation({
    mutationFn: (value: PostSendmail) => postSendmail(value),
    // onError: (err) => console.log(err),
    // onSuccess: (data) => console.log(data),
  });

export const usePostVerify = () =>
  useMutation({
    mutationFn: (value: PostVerify) => postVerify(value),
    // onError: (err) => console.log(err),
  });

export const usePostNickname = () =>
  useMutation({
    mutationFn: (value: PostNickname) => postNickname(value),
  });

export const usePostSignin = () =>
  useMutation({
    mutationFn: (value: PostSignin) => postSignin(value),
    // onError: (err) => console.log(err),
    // onSuccess: (data) => console.log(data),
  });

export const usePostSignout = () =>
  useMutation({
    mutationFn: () => postSignout(),
  });

export const usePostRefreshtoken = () =>
  useMutation({
    mutationFn: () => postRefreshtoken(),
  });
