export interface PostAccounts {
  profileImage: string;
  request: {
    changeNickname: string;
  };
}

export interface GetAccounts {
  email: string;
  nickname: string;
  profileImageUrl: string;
}
