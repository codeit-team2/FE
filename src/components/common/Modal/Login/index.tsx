import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler, FieldValues, FormProvider } from 'react-hook-form';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface LoginProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsSignupModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Login({
  isLoginModalOpen,
  setIsLoginModalOpen,
  setIsSignupModalOpen,
}: LoginProps) {
  const form = useForm();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = (value: FieldValues) => {};

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
      <DialogTrigger>
        <div>로그인</div>
      </DialogTrigger>
      <DialogContent className="px-20 pb-50 pt-32 sm:w-520 sm:px-40 sm:pb-32">
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
