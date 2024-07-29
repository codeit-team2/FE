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
  NicknameOnSuccessAndonErrorType,
  OnSuccessAndonErrorType,
  PostNickname,
  PostSendmail,
  PostSignin,
  PostSignup,
  PostVerify,
  SigninOnSuccessAndonErrorType,
} from '@/types/auths';

export const usePostSignup = ({ onSuccess, onError }: OnSuccessAndonErrorType) =>
  useMutation<PostSignup, AxiosError, PostSignup>({
    mutationFn: (value: PostSignup) => postSignup(value),
    onSuccess: onSuccess,
    onError: onError,
  });

export const usePostSendmail = ({ onSuccess, onError }: OnSuccessAndonErrorType) =>
  useMutation<PostSendmail, AxiosError, PostSendmail>({
    mutationFn: (value: PostSendmail) => postSendmail(value),
    onSuccess: onSuccess,
    onError: onError,
  });

export const usePostVerify = ({ onSuccess, onError }: OnSuccessAndonErrorType) =>
  useMutation<PostVerify, AxiosError, PostVerify>({
    mutationFn: (value: PostVerify) => postVerify(value),
    onSuccess: onSuccess,
    onError: onError,
  });

export const usePostNickname = ({ onSuccess }: NicknameOnSuccessAndonErrorType) => {
  return useMutation<PostNickname, AxiosError, PostNickname>({
    mutationFn: (value: PostNickname) => postNickname(value),
    onSuccess: onSuccess,
  });
};

export const usePostSignin = ({ onSuccess }: SigninOnSuccessAndonErrorType) =>
  useMutation<PostSignin, AxiosError, PostSignin>({
    mutationFn: (value: PostSignin) => postSignin(value),
    onSuccess: onSuccess,
  });

export const usePostSignout = () =>
  useMutation({
    mutationFn: () => postSignout(),
  });

export const usePostRefreshtoken = () =>
  useMutation({
    mutationFn: () => postRefreshtoken(),
  });
