export const ERROR_MESSAGE = {
  nickName: {
    required: '닉네임을 입력해 주세요',
    min: '2자~8자 사이의 닉네임을 입력해 주세요',
    max: '2자~8자 사이의 닉네임을 입력해 주세요',
    duplicate: '중복된 닉네임입니다',
    valid: '특수문자는 포함할 수 없습니다',
  },
  email: {
    required: '이메일을 입력해 주세요',
    valid: '올바른 이메일이 아닙니다',
    duplicate: '중복된 이메일입니다',
    register: '이메일 또는 비밀번호를 확인해 주세요',
  },
  verifyCode: {
    required: '인증코드를 입력해 주세요',
    max: '숫자 6자만 입력해 주세요',
    valid: '숫자 6자만 입력해 주세요',
    auth: '인증코드가 일치하지 않습니다',
  },
  password: {
    required: '비밀번호를 입력해 주세요',
    min: '8자 이상으로 입력해 주세요',
    valid: '영문, 숫자를 모두 포함해 주세요',
    check: '비밀번호가 일치하지 않습니다',
  },
};

export const PLACEHOLDER = {
  nickName: '닉네임을 입력해 주세요',
  email: '이메일을 입력해 주세요',
  verifyCode: '인증코드를 입력해 주세요',
  password: '비밀번호를 입력해 주세요',
  passwordCheck: '비밀번호를 다시 한 번 입력해 주세요',
};
