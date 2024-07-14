import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';

import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';

import EditButton from '@/components/common/Button/Edit';
import Input from '@/components/common/Input';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProfileEditModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm();

  const {
    handleSubmit,
    register,
    getFieldState,
    trigger,
    // formState: { isValid },
  } = form;

  // const onSubmit: SubmitHandler<FieldValues> = (value: FieldValues) => {};
  const onSubmit: SubmitHandler<FieldValues> = () => {};

  useEffect(() => {
    trigger();
  }, [isModalOpen, trigger]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <EditButton size={48} />
      </DialogTrigger>
      <DialogOverlay className="bg-neutral-950/80 md:bg-transparent" />
      <DialogContent className="max-h-[410px] w-320 overflow-hidden rounded-md px-20 py-32 md:w-520 md:px-40 md:py-32">
        <DialogTitle>프로필 수정</DialogTitle>
        <FormProvider {...form}>
          <form
            className="flex flex-col items-center gap-24"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <Image
                src={'/images/profile-default.png'}
                alt="프로필 사진"
                width={102}
                height={102}
              />
              <div className="absolute -right-8 bottom-0">
                <EditButton size={36} />
              </div>
            </div>
            <div className="flex w-full flex-col gap-50">
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
              <Button className={`w-full`} variant="secondary" type="submit">
                수정하기
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
