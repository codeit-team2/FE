import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import { useAuth } from '@/context/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Input from '@/components/common/Input';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { usePostSignin } from '@/hooks/useAuths';
import useIsMobile from '@/hooks/useIsMobile';

import { ErrorResponse, PostSignin } from '@/types/auths';

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  isSignupModalOpen: boolean;
  setIsSignupModalOpen: Dispatch<SetStateAction<boolean>>;
}

const errorMessages: { [key: string]: string } = {
  PASSWORD_MISMATCH: '이메일 또는 비밀번호를 확인해 주세요',
  UNREGISTERED_ACCOUNT: '이메일 또는 비밀번호를 확인해 주세요',
};

export default function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isSignupModalOpen,
  setIsSignupModalOpen,
}: LoginModalProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (isLoginModalOpen && isMobile) {
    router.push('/login');
  }

  const { setIsLogin } = useAuth();

  const queryClient = useQueryClient();

  const { mutate: mutateSiginin, error: errorSiginin } = usePostSignin();

  const axiosError = errorSiginin as AxiosError<ErrorResponse>;

  const form = useForm<PostSignin>();

  const {
    handleSubmit,
    register,
    trigger,
    setError,
    formState: { isValid },
  } = form;

  useEffect(() => {
    if (axiosError?.response?.data.code) {
      setError('email', { message: errorMessages[axiosError?.response?.data.code] });
    }
  }, [axiosError, setError]);

  const onSubmit: SubmitHandler<PostSignin> = async (value: PostSignin) => {
    mutateSiginin(value, {
      onSuccess: (data: { accessToken: string; tokenScheme: string }) => {
        setCookie('accessToken', data.accessToken);
        queryClient.invalidateQueries({
          queryKey: ['user'],
          refetchType: 'active',
        });
        setIsLogin(true);
        setIsLoginModalOpen(false);
      },
    });
  };

  useEffect(() => {
    trigger();
  }, [isLoginModalOpen]);

  if (router.pathname === '/login') return;

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
      <DialogTrigger>
        <div
          className={`hover:text-body-1M hover:text-primary-300 ${isLoginModalOpen || isSignupModalOpen ? 'text-body-1Sb text-neutral-900' : 'text-body-1M text-neutral-500'}`}
        >
          로그인
        </div>
      </DialogTrigger>
      <DialogContent className="top-0 max-h-[445px] translate-y-56 overflow-hidden px-20 pb-50 pt-32 md:top-[50%] md:w-520 md:translate-y-[-50%] md:px-40 md:pb-32">
        <DialogTitle>로그인</DialogTitle>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-50"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  })}
                />
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
                  })}
                />
              </div>
            </div>
            <div>
              <Button
                className={`mb-24 w-full ${!isValid && 'cursor-default bg-neutral-400 !text-neutral-100 hover:!text-neutral-100'}`}
                variant="secondary"
                type="submit"
              >
                로그인
              </Button>
              <p className="text-center text-body-2Sb">
                <span className="mr-6">취ZONE이 처음이신가요?</span>
                <span
                  className="cursor-pointer text-primary-300 underline underline-offset-2"
                  onClick={() => {
                    setIsSignupModalOpen(true);
                    setIsLoginModalOpen(false);
                  }}
                >
                  회원가입
                </span>
              </p>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
