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

export interface ResponsePostNickname {
  isDuplicate: boolean;
}

export interface PostSignin {
  email: string;
  password: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
}
