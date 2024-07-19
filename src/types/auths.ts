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
