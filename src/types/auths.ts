import { AxiosError } from 'axios';

export interface PostSignup {
  email: string;
  password: string;
  nickname: string;
}

export interface PostSendmail {
  email: string;
}

export interface PostVerify {
  email: string;
  code: string;
}

export interface PostNickname {
  nickname: string;
}

export interface PostSignin {
  email: string;
  password: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export interface OnSuccessAndonErrorType {
  onSuccess: (data: string) => void;
  onError: (error: AxiosError) => void;
}

export interface NicknameOnSuccessAndonErrorType {
  onSuccess: (data: { isDuplicate: boolean }) => void;
}

export interface SigninOnSuccessAndonErrorType {
  onSuccess: (data: { accessToken: string; tokenScheme: string }) => void;
}
