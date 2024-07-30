import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import { useQueryClient } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { AxiosError } from 'axios';
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

import { usePostAccounts } from '@/hooks/useAccounts';
import { usePostNickname } from '@/hooks/useAuths';

import { GetAccounts } from '@/types/accounts';

interface ProfileEditModalProps {
  user: GetAccounts;
}

export default function ProfileEditModal({ user }: ProfileEditModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nicknameState, setNicknameState] = useState({
    successMessage: '',
    errorMessage: '',
    validated: false,
  });
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const form = useForm();

  const { handleSubmit, register, getFieldState, trigger, watch, setValue } = form;

  const { mutate: mutateNicknameDuplicate } = usePostNickname();

  const handleNicknameDuplicate = () => {
    mutateNicknameDuplicate(
      { nickname: watch('nickname') },
      {
        onSuccess: (data: { isDuplicate: boolean }) => {
          if (!data.isDuplicate) {
            setNicknameState((prev) => ({ ...prev, successMessage: '사용 가능한 닉네임입니다' }));
            setNicknameState((prev) => ({ ...prev, validated: true }));
          } else {
            setNicknameState((prev) => ({
              ...prev,
              errorMessage: ERROR_MESSAGE.nickname.duplicate,
            }));
          }
        },
      },
    );
  };

  const handleImageChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.files) {
      const formData = new FormData();
      formData.append('image', value.target.files[0]);
      setProfileImageUrl(URL?.createObjectURL(value.target.files[0]));
      setValue('profileImage', value.target.files[0]);
    }
  };

  useEffect(() => {
    if (watch('nickname') === '') {
      setNicknameState((prev) => ({ ...prev, successMessage: '' }));
    }
  }, [watch('nickname')]);

  const queryClient = useQueryClient();

  const { mutate: mutateAccounts } = usePostAccounts();

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    const formData = new FormData();

    const request = {
      changeNickname: value.nickname,
    };

    formData.append('profileImage', value.profileImage);
    formData.append('request', JSON.stringify(request));

    mutateAccounts(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['user'],
          refetchType: 'active',
        });
        setIsModalOpen(false);
      },
      onError: (error: AxiosError) => {
        const parsedErrorCode = JSON.parse(error.request.response);
        setNicknameState((prev) => ({ ...prev, errorMessage: parsedErrorCode.message }));
      },
    });
  };

  useEffect(() => {
    trigger();
  }, [isModalOpen, trigger]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <EditButton size={48} />
      </DialogTrigger>
      <DialogOverlay className="bg-neutral-900/70 md:bg-transparent" />
      <DialogContent className="max-h-[410px] w-320 overflow-hidden rounded-md px-20 py-32 md:w-520 md:px-40 md:py-32">
        <DialogTitle>프로필 수정</DialogTitle>
        <FormProvider {...form}>
          <form
            className="flex flex-col items-center gap-24"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              {!profileImageUrl ? (
                user?.profileImageUrl ? (
                  <Image
                    className="aspect-square rounded-[50%] border-2 border-neutral-300"
                    src={user?.profileImageUrl}
                    alt="프로필 사진"
                    width={102}
                    height={102}
                  />
                ) : (
                  <Image
                    src={'/images/profile-default.png'}
                    alt="기본 프로필 사진"
                    width={102}
                    height={102}
                  />
                )
              ) : (
                <Image
                  className="aspect-square rounded-[50%] border-2 border-neutral-300"
                  src={profileImageUrl}
                  alt="프로필 사진"
                  width={102}
                  height={102}
                />
              )}
              <div className="absolute -right-8 bottom-0">
                <label>
                  <input
                    {...register('profileImage', { onChange: (value) => handleImageChange(value) })}
                    className="absolute hidden"
                    type="file"
                    accept="image/*"
                  />
                  <EditButton size={36} />
                </label>
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
                    defaultValue={user?.nickname}
                    maxLength={8}
                    successMessage={nicknameState.successMessage}
                    propErrorMessage={nicknameState.errorMessage}
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
                        setNicknameState((prev) => ({ ...prev, successMessage: '' }));
                        setNicknameState((prev) => ({ ...prev, errorMessage: '' }));
                        setNicknameState((prev) => ({ ...prev, validated: false }));
                        trigger('nickname');
                      },
                    })}
                  />
                  <Button
                    type="button"
                    className="w-130 flex-shrink-0"
                    variant="secondary"
                    disabled={
                      getFieldState('nickname').invalid ||
                      nicknameState.validated ||
                      watch('nickname') === user?.nickname ||
                      watch('nickname') === ''
                    }
                    onClick={handleNicknameDuplicate}
                  >
                    중복 검사하기
                  </Button>
                </div>
              </div>
              <Button
                className={`w-full`}
                variant="secondary"
                type="submit"
                disabled={!nicknameState.validated && watch('nickname') !== user?.nickname}
              >
                수정하기
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
