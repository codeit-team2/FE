import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import { useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import Input from '@/components/common/Input';

import { Button } from '@/components/ui/button';

import { usePostSignin } from '@/hooks/useAuths';
import useIsMobile from '@/hooks/useIsMobile';

import { ErrorResponse, PostSignin } from '@/types/auths';

const errorMessages: { [key: string]: string } = {
  PASSWORD_MISMATCH: '이메일 또는 비밀번호를 확인해 주세요',
  UNREGISTERED_ACCOUNT: '이메일 또는 비밀번호를 확인해 주세요',
};

export default function MobileLoginPage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile === false) {
      router.push('/');
    }
  }, [isMobile, router]);

  const queryClient = useQueryClient();

  const { mutate: mutateSiginin, error: errorSiginin } = usePostSignin({
    onSuccess: (data: { accessToken: string; tokenScheme: string }) => {
      setCookie('accessToken', data.accessToken);
      queryClient.invalidateQueries({
        queryKey: ['user'],
        refetchType: 'active',
      });
      router.push('/');
    },
  });

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

  const onSubmit: SubmitHandler<PostSignin> = (value: PostSignin) => {
    mutateSiginin(value);
  };

  useEffect(() => {
    trigger();
  }, []);

  return (
    <>
      <GNB />
      <div className="border-b-8 border-b-neutral-50 bg-white px-20 pb-50 pt-32">
        <p className="mb-32 text-center text-heading-2Sb">로그인</p>
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
                  onClick={() => router.push('/signup')}
                >
                  회원가입
                </span>
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
      <Footer />
    </>
  );
}
