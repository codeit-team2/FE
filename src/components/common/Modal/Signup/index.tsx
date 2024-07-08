import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler, FieldValues, FormProvider } from 'react-hook-form';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface SignupProps {
  isSignupModalOpen: boolean;
  setIsSignupModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Signup({
  isSignupModalOpen,
  setIsSignupModalOpen,
  setIsLoginModalOpen,
}: SignupProps) {
  const [isAgree, setIsAgree] = useState(false);

  const form = useForm();

  const {
    handleSubmit,
    register,
    getFieldState,
    watch,
    trigger,
    formState: { isValid },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = (value: FieldValues) => {};

  useEffect(() => {
    trigger();
  }, [isSignupModalOpen]);
  return (
    <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
      <DialogContent className="px-20 pb-50 pt-32 sm:w-520 sm:px-40 sm:pb-32">
        <DialogTitle>회원가입</DialogTitle>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-50"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
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
                      onChange: () => trigger('nickname'),
                    })}
                  />
                  <Button
                    type="button"
                    className="w-130 flex-shrink-0"
                    variant="secondary"
                    disabled={getFieldState('nickname').invalid}
                  >
                    중복 검사하기
                  </Button>
                </div>
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
                  {...register('email', {
                    required: ERROR_MESSAGE.email.required,
                    pattern: {
                      value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: ERROR_MESSAGE.email.valid,
                    },
                    onChange: () => trigger('email'),
                  })}
                />
                <Button
                  type="button"
                  className="w-130 flex-shrink-0"
                  variant="secondary"
                  disabled={getFieldState('email').invalid}
                >
                  인증코드 보내기
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-6 flex justify-between text-body-2Sb">
                <label htmlFor="verifyCode">이메일 인증코드</label>
                <span className="cursor-pointer text-primary-300 underline underline-offset-2">
                  인증코드 재전송
                </span>
              </div>
              <div className="flex gap-8">
                <Input
                  type="text"
                  id="verifyCode"
                  placeholder={PLACEHOLDER.verifyCode}
                  maxLength={6}
                  {...register('verifyCode', {
                    required: ERROR_MESSAGE.verifyCode.required,
                    maxLength: {
                      value: 6,
                      message: ERROR_MESSAGE.verifyCode.max,
                    },
                    pattern: {
                      value: /^\d{6}$/,
                      message: ERROR_MESSAGE.verifyCode.valid,
                    },
                    onChange: () => trigger('verifyCode'),
                  })}
                />
                <Button
                  type="button"
                  className="w-130 flex-shrink-0"
                  variant="secondary"
                  disabled={getFieldState('verifyCode').invalid}
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
                      match: (value) => value === watch('password') || ERROR_MESSAGE.password.check,
                    },
                  })}
                />
              </div>
            </div>
            <div>
              <div className="mb-24">
                <div className="mb-16 flex items-center gap-6">
                  <button type="button" onClick={() => setIsAgree((prev) => !prev)}>
                    {isAgree ? (
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
                <Button
                  className={`w-full ${(!isValid || !isAgree) && 'cursor-default bg-neutral-400 !text-neutral-100 hover:!text-neutral-100'}`}
                  variant="secondary"
                  type="submit"
                >
                  회원가입
                </Button>
              </div>
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
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
