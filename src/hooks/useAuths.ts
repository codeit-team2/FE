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

// any 타입 추후 변경
export const usePostSignup = ({ onSuccess, onError }: any) =>
  useMutation({
    mutationFn: (value: PostSignup) => postSignup(value),
    onSuccess: onSuccess,
    onError: onError,
  });

export const usePostSendmail = ({ onSuccess, onError }: any) =>
  useMutation({
    mutationFn: (value: PostSendmail) => postSendmail(value),
    onSuccess: onSuccess,
    onError: onError,
  });

export const usePostVerify = ({ onSuccess, onError }: any) =>
  useMutation({
    mutationFn: (value: PostVerify) => postVerify(value),
    onSuccess: onSuccess,
    onError: onError,
  });

export const usePostNickname = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: (value: PostNickname) => postNickname(value),
    onSuccess: onSuccess,
  });
};

export const usePostSignin = ({ onSuccess, onError }: any) =>
  useMutation({
    mutationFn: (value: PostSignin) => postSignin(value),
    onSuccess: onSuccess,
    onError: onError,
  });

export const usePostSignout = () =>
  useMutation({
    mutationFn: () => postSignout(),
  });

export const usePostRefreshtoken = () =>
  useMutation({
    mutationFn: () => postRefreshtoken(),
  });
