import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Input from '@/components/common/Input';
import DynamicModal from '@/components/common/Modal/Dynamic';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

import { usePostNickname, usePostSendmail, usePostSignup, usePostVerify } from '@/hooks/useAuths';
import useIsMobile from '@/hooks/useIsMobile';
import useScrollbarAndScrollState from '@/hooks/useIsScrollbarVisible';

import { PostSignup } from '@/types/auths';

interface SignupModalProps {
  isSignupModalOpen: boolean;
  setIsSignupModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface SignupValue {
  nickname: string;
  email: string;
  code: string;
  password: string;
  passwordCheck: string;
}

interface SubmitErrorMessages {
  [key: string]: {
    message: string;
    name: 'password' | 'nickname' | 'email' | 'code' | 'passwordCheck';
  };
}

const errorMessages: { [key: string]: string } = {
  SERVER_ERROR: '서버에 문제가 발생했습니다',
  ALREADY_SIGNED_UP: '이미 회원 가입한 이메일입니다',
  CANNOT_SEND_MAIL: '이미 인증 메일이 발송되었습니다',
  NOT_VERIFICATION: '아직 메일 인증을 진행하지 않았습니다',
  VERIFICATION_FAILED: '인증 코드가 일치하지 않습니다',
  EXPIRED_VERIFY_CODE: '인증 코드가 만료되었습니다',
};

const submitErrorMessages: SubmitErrorMessages = {
  VALIDATION_PASSWORD_ERROR: {
    message: '영문, 숫자를 포함해 8글자 이상 입력해 주세요',
    name: 'password',
  },
  VALIDATION_NICKNAME_ERROR: {
    message: '2자~8자 사이의 닉네임을 입력해 주세요',
    name: 'nickname',
  },
  NOT_VERIFICATION: {
    message: '아직 메일 인증을 진행하지 않았습니다',
    name: 'email',
  },
  DUPLICATE_NICKNAME: {
    message: '중복된 닉네임입니다',
    name: 'nickname',
  },
};

export default function SignupModal({
  isSignupModalOpen,
  setIsSignupModalOpen,
  setIsLoginModalOpen,
}: SignupModalProps) {
  const [isValidated, setIsValidated] = useState({
    nickname: false,
    verify: false,
    agree: false,
  });
  const [successMessages, setSuccessMessages] = useState({
    nickname: '',
    email: '',
    code: '',
  });
  const [propErrorMessage, setErrorMessages] = useState({
    nickname: '',
    email: '',
    code: '',
  });
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  const [scrollRef, isScrollbarVisible] =
    useScrollbarAndScrollState<HTMLDivElement>(isSignupModalOpen);

  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSignupModalOpen && isMobile) {
      router.push('/signup');
    }
  }, [isMobile, router]);

  const form = useForm<SignupValue>();

  const {
    handleSubmit,
    register,
    getFieldState,
    watch,
    trigger,
    setError,
    formState: { isValid },
  } = form;

  const { mutate: mutateNicknameDuplicate } = usePostNickname();

  const handleNicknameDuplicate = () => {
    mutateNicknameDuplicate(
      { nickname: watch('nickname') },
      {
        onSuccess: (data: { isDuplicate: boolean }) => {
          if (!data.isDuplicate) {
            setSuccessMessages((prev) => ({ ...prev, nickname: '사용 가능한 닉네임입니다' }));
            setIsValidated((prev) => ({ ...prev, nickname: true }));
          } else {
            setErrorMessages((prev) => ({ ...prev, nickname: ERROR_MESSAGE.nickname.duplicate }));
          }
        },
      },
    );
  };

  const { mutate: mutateSendmail } = usePostSendmail();

  const handleSendmail = () => {
    mutateSendmail(
      { email: watch('email') },
      {
        onSuccess: (data: string) => {
          if (data === '') {
            setSuccessMessages((prev) => ({ ...prev, email: '인증코드 전송에 성공했습니다' }));
          }
        },
        onError: (error: AxiosError) => {
          setSuccessMessages((prev) => ({ ...prev, email: '' }));
          const parsedErrorCode = JSON.parse(error.request.response);
          setErrorMessages((prev) => ({ ...prev, email: errorMessages[parsedErrorCode.code] }));
        },
      },
    );
  };

  const { mutate: mutateVerify } = usePostVerify();

  const handleVerify = () => {
    mutateVerify(
      { email: watch('email'), code: watch('code') },
      {
        onSuccess: (data: string) => {
          if (data === '') {
            setSuccessMessages((prev) => ({ ...prev, code: '인증코드가 일치합니다' }));
            setErrorMessages((prev) => ({ ...prev, email: '' }));
            setIsValidated((prev) => ({ ...prev, verify: true }));
          }
        },
        onError: (error: AxiosError) => {
          setSuccessMessages((prev) => ({ ...prev, code: '' }));
          const parsedErrorCode = JSON.parse(error.request.response);
          setErrorMessages((prev) => ({ ...prev, code: errorMessages[parsedErrorCode.code] }));
        },
      },
    );
  };

  const handleSubmitModalClose = () => {
    setIsSubmitModalOpen(false);
  };

  const { mutate: mutateSubmit } = usePostSignup();

  const onSubmit: SubmitHandler<SignupValue> = (value: SignupValue) => {
    if (!isValidated.agree) return;

    const validateFields = () => {
      if (!isValidated.nickname) {
        setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
        setError('nickname', { message: '닉네임을 확인해 주세요' });
        return false;
      }
      if (!isValidated.verify) {
        setError('email', { message: '이메일 또는 인증코드를 확인해 주세요' });
        setSuccessMessages((prev) => ({ ...prev, email: '' }));
        return false;
      }
      return true;
    };

    if (validateFields()) {
      const values: PostSignup = {
        nickname: value.nickname,
        email: value.email,
        password: value.password,
      };

      mutateSubmit(values, {
        onSuccess: () => {
          setIsSignupModalOpen(false);
          setIsSubmitModalOpen(true);
        },
        onError: (error: AxiosError) => {
          const parsedErrorCode = JSON.parse(error.request.response);
          setSuccessMessages((prev) => ({
            ...prev,
            [submitErrorMessages[parsedErrorCode.code].name]: '',
          }));
          setError(submitErrorMessages[parsedErrorCode.code].name, {
            message: submitErrorMessages[parsedErrorCode.code].message,
          });
        },
      });
    }
  };

  return (
    <>
      <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
        <DialogContent className="top-0 h-[calc(100%-56px)] max-h-[848px] translate-y-56 px-0 pb-[calc(86px+64px)] pt-32 md:top-[50%] md:max-h-[854px] md:w-520 md:translate-y-[-50%] md:pb-[calc(86px+64px)]">
          <DialogTitle>회원가입</DialogTitle>
          <FormProvider {...form}>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className={`z-50 h-full overflow-hidden ${isScrollbarVisible && "before:absolute before:z-[999] before:h-20 before:w-full before:-translate-y-2 before:bg-gradient-to-t before:from-transparent before:to-white before:content-[''] after:absolute after:z-[999] after:h-20 after:w-full after:-translate-y-19 after:bg-gradient-to-t after:from-white after:to-transparent after:content-['']"}`}
            >
              <div
                className={`scroll h-full overflow-y-auto px-20 md:px-40 ${isScrollbarVisible && 'md:pr-20'}`}
                ref={scrollRef}
              >
                <div className="flex h-full flex-col gap-50 pt-8">
                  <div>
                    <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                      닉네임
                    </label>
                    <div className="flex gap-8">
                      <Input
                        type="text"
                        id="nickname"
                        placeholder={PLACEHOLDER.nickname}
                        maxLength={8}
                        successMessage={successMessages.nickname}
                        propErrorMessage={propErrorMessage.nickname}
                        {...register('nickname', {
                          required: ERROR_MESSAGE.nickname.required,
                          minLength: {
                            value: 2,
                            message: ERROR_MESSAGE.nickname.min,
                          },
                          maxLength: {
                            value: 8,
                            message: ERROR_MESSAGE.nickname.max,
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
                            message: ERROR_MESSAGE.nickname.valid,
                          },
                          onChange: () => {
                            setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
                            setErrorMessages((prev) => ({ ...prev, nickname: '' }));
                            setIsValidated((prev) => ({ ...prev, nickname: false }));
                            trigger('nickname');
                          },
                        })}
                      />
                      <Button
                        type="button"
                        className="w-130 flex-shrink-0"
                        variant="secondary"
                        disabled={getFieldState('nickname').invalid || isValidated.nickname}
                        onClick={handleNicknameDuplicate}
                      >
                        중복 검사하기
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-6 block text-body-2Sb" htmlFor="email">
                      이메일
                    </label>
                    <div className="flex gap-8">
                      <Input
                        type="text"
                        id="email"
                        placeholder={PLACEHOLDER.email}
                        successMessage={successMessages.email}
                        propErrorMessage={propErrorMessage.email}
                        {...register('email', {
                          required: ERROR_MESSAGE.email.required,
                          pattern: {
                            value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: ERROR_MESSAGE.email.valid,
                          },
                          onChange: () => {
                            setSuccessMessages((prev) => ({ ...prev, email: '' }));
                            setErrorMessages((prev) => ({ ...prev, email: '' }));
                            setIsValidated((prev) => ({ ...prev, verify: false }));
                            trigger('email');
                          },
                        })}
                      />
                      {isValidated.verify ? (
                        <Button
                          type="button"
                          className="w-130 flex-shrink-0"
                          variant="secondary"
                          disabled={true}
                          onClick={handleSendmail}
                        >
                          인증완료
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="w-130 flex-shrink-0"
                          variant="secondary"
                          disabled={getFieldState('email').invalid || !!successMessages.code}
                          onClick={handleSendmail}
                        >
                          인증코드 보내기
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mb-6 flex justify-between text-body-2Sb">
                      <label htmlFor="code">이메일 인증코드</label>
                      <button
                        className={`underline underline-offset-2 ${isValidated.verify && (getFieldState('email').invalid || !!successMessages.code) ? 'hidden' : 'text-primary-300'}`}
                        type="button"
                        onClick={handleSendmail}
                        disabled={getFieldState('email').invalid || !!successMessages.code}
                      >
                        인증코드 재전송
                      </button>
                    </div>
                    <div className="flex gap-8">
                      <Input
                        type="text"
                        id="code"
                        placeholder={PLACEHOLDER.code}
                        successMessage={successMessages.code}
                        propErrorMessage={propErrorMessage.code}
                        maxLength={6}
                        {...register('code', {
                          required: ERROR_MESSAGE.code.required,
                          maxLength: {
                            value: 6,
                            message: ERROR_MESSAGE.code.max,
                          },
                          pattern: {
                            value: /^\d{6}$/,
                            message: ERROR_MESSAGE.code.valid,
                          },
                          onChange: () => {
                            setSuccessMessages((prev) => ({ ...prev, code: '' }));
                            setErrorMessages((prev) => ({ ...prev, code: '' }));
                            setErrorMessages((prev) => ({ ...prev, email: '' }));
                            trigger('code');
                            setIsValidated((prev) => ({ ...prev, verify: false }));
                          },
                        })}
                      />
                      <Button
                        type="button"
                        className="w-130 flex-shrink-0"
                        variant="secondary"
                        disabled={getFieldState('code').invalid}
                        onClick={handleVerify}
                      >
                        확인
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="mb-6 block text-body-2Sb" htmlFor="password">
                      비밀번호
                    </label>
                    <div className="flex gap-8">
                      <Input
                        type="password"
                        id="password"
                        placeholder={PLACEHOLDER.password}
                        maxLength={100}
                        {...register('password', {
                          required: ERROR_MESSAGE.password.required,
                          minLength: {
                            value: 8,
                            message: ERROR_MESSAGE.password.min,
                          },
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                            message: ERROR_MESSAGE.password.valid,
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-6 block text-body-2Sb" htmlFor="passwordCheck">
                      비밀번호 확인
                    </label>
                    <div className="flex gap-8">
                      <Input
                        type="password"
                        id="passwordCheck"
                        placeholder={PLACEHOLDER.passwordCheck}
                        maxLength={100}
                        {...register('passwordCheck', {
                          required: ERROR_MESSAGE.password.required,
                          validate: {
                            match: (value) =>
                              value === watch('password') || ERROR_MESSAGE.password.check,
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={() => setIsValidated((prev) => ({ ...prev, agree: !prev.agree }))}
                      >
                        {isValidated.agree ? (
                          <Image
                            src={'/icons/ic-checkbox-on.svg'}
                            alt="체크 상태 아이콘"
                            width={24}
                            height={24}
                          />
                        ) : (
                          <Image
                            src={'/icons/ic-checkbox-off.svg'}
                            alt="체크 해제 상태 아이콘"
                            width={24}
                            height={24}
                          />
                        )}
                      </button>
                      <p className="text-body-2Sb">
                        <span className="cursor-pointer text-primary-300 underline underline-offset-2">
                          이용약관
                        </span>
                        <span className="mr-6">과</span>
                        <span className="cursor-pointer text-primary-300 underline underline-offset-2">
                          개인정보취급방침
                        </span>
                        에 동의합니다
                      </p>
                    </div>
                  </div>
                  <div className="fixed bottom-32 w-[calc(100%-40px)] md:w-[calc(520px-80px)]">
                    <Button
                      className={`mb-24 w-full ${(!isValid || !isValidated.agree) && 'cursor-default bg-neutral-400 !text-neutral-100 hover:!text-neutral-100'}`}
                      variant="secondary"
                      type="submit"
                    >
                      회원가입
                    </Button>
                    <p className="text-center text-body-2Sb">
                      <span className="mr-6">이미 회원이신가요?</span>
                      <span
                        className="cursor-pointer text-primary-300 underline underline-offset-2"
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsSignupModalOpen(false);
                        }}
                      >
                        로그인
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <DynamicModal
        modalType="message"
        title="회원가입 성공"
        description="회원가입이 완료되었습니다"
        isOpen={isSubmitModalOpen}
        onClose={handleSubmitModalClose}
      />
    </>
  );
}
