import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Input from '@/components/common/Input';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsSignupModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
  setIsSignupModalOpen,
}: LoginModalProps) {
  const form = useForm();

  const {
    handleSubmit,
    register,
    trigger,
    formState: { isValid },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = (value: FieldValues) => {};

  useEffect(() => {
    trigger();
  }, [isLoginModalOpen]);

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
      <DialogTrigger>
        <div>로그인</div>
      </DialogTrigger>
      <DialogContent className="top-0 translate-y-56 px-20 pb-50 pt-32 md:top-[50%] md:w-520 md:translate-y-[-50%] md:px-40 md:pb-32">
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
