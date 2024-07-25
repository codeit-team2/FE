import { CATEGORY, LOCATION } from '@/constants/dropdownItems';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import { amTime, pmTime } from '@/constants/timeItems';

import React, { useEffect, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import DropdownInput from '../DropdownInput';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Calendar from '@/components/common/Calendar';
import Input from '@/components/common/Input';
import LoginRequired from '@/components/common/Modal/LoginRequired';

import FileInput from '@/components/MakeClub/FileInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { isDateBeforeToday } from '@/lib/utils';

import { usePostGatherings, usePutGatherings } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

interface Props {
  trigger: 'text' | 'plus' | 'modify';
  data?: Gathering;
}

export default function MakeClubModal({ trigger, data }: Props) {
  const [selectTime, setSelectTime] = useState<string>();
  const [isSubmitCheck, setIsSubmitCheck] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [gatheringId, setGatheringId] = useState<number>(0);

  interface FormValues {
    gatheringImage: File | null;
    category: string;
    location: string;
    name: string;
    capacity: number;
  }

  const form = useForm<FormValues>();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { isValid },
  } = form;

  const router = useRouter();

  // category 객체 -> 배열
  const flattenCategories = (categoryObj: object) => {
    const result: string[] = [];
    for (const [key, values] of Object.entries(categoryObj)) {
      values.forEach((value: string) => {
        result.push(`${key} · ${value}`);
      });
    }
    return result;
  };

  const flattenedCategories = flattenCategories(CATEGORY);

  // 달력 에러 메세지
  const isSelectedDateBeforeToday = isDateBeforeToday({ date });
  let dateErrorMsg = null;
  if (!date) {
    dateErrorMsg = ERROR_MESSAGE.date.required;
  } else if (isSelectedDateBeforeToday) {
    dateErrorMsg = ERROR_MESSAGE.date.invalidRange;
  } else dateErrorMsg = null;

  // 시간 에러 메세지
  let timeErrorMsg: string | null = ERROR_MESSAGE.time.required;
  if (selectTime) {
    timeErrorMsg = null;
  }

  // trigger Button - '+' or '모임만들기' text
  const triggerButton =
    (trigger === 'text' && <Button className="mb-50 hidden md:block">모임만들기</Button>) ||
    (trigger === 'plus' && (
      <button className="fixed bottom-32 right-32 z-20 cursor-pointer rounded-[40px] bg-primary-300 p-16">
        <div className="relative h-24 w-24">
          <Image src="/icons/ic-plus.svg" alt="ic-plus" fill />
        </div>
      </button>
    )) ||
    (trigger === 'modify' && (
      <Button className="w-186" variant={'secondary'}>
        모임 수정하기
      </Button>
    ));

  interface Request {
    name: string;
    capacity: number;
    mainCategoryName: string;
    subCategoryName: string;
    location: string;
    dateTime: string;
  }

  // react-query
  const { mutate: postMutate } = usePostGatherings();
  const { mutate: putMutate } = usePutGatherings();

  // 제출 버튼 클릭
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (data && date && !dateErrorMsg && selectTime && !timeErrorMsg) {
      // category를 main과 sub로 구분
      const splitItem = data.category.split(' · ');
      const mainCategory = splitItem[0];
      const subCateogry = splitItem[1];

      // dateTime
      const date_str = date?.toISOString();
      const date_part = date_str.split('T')[0];
      const newDatetimeStr = `${date_part}T${selectTime}:00.000Z`;

      const request: Request = {
        name: data.name,
        capacity: data.capacity,
        location: data.location,
        mainCategoryName: mainCategory,
        subCategoryName: subCateogry,
        dateTime: newDatetimeStr,
      };

      formData.append('request', JSON.stringify(request));
      formData.append('gatheringImage', data.gatheringImage);

      const value = {
        gatheringId: gatheringId,
        value: formData,
      };

      // api 함수
      trigger === 'modify'
        ? putMutate(value, {
            onSuccess: (data) => {
              console.log('Success: ', data);
            },
            onError: (error) => {
              console.error('Error:', error);
            },
          })
        : postMutate(formData, {
            onSuccess: (data) => {
              const gatheringId = data.data.gatheringId.toString();
              data.status === 201 && router.push(`/detail/${gatheringId}`);
            },
            onError: (error) => {
              console.error('Error:', error);
            },
          });
    }
  };

  // login 상태 확인하는 과정 추가 필요
  const isLogin = true;

  // 제출버튼 클릭 여부 (제출과 상관 없이 단순 버튼 클릭 여부)
  const handleSubmitButton = () => {
    setIsSubmitCheck(true);
  };

  // modify - 수정할 때 기존에 가지고 있던 값 불러오기
  useEffect(() => {
    if (trigger === 'modify' && data) {
      setGatheringId(data.gatheringId);
      setValue('name', data?.name);
      setValue('capacity', data?.capacity);
      setDate(new Date(data.dateTime));
      setSelectTime(data.dateTime.substring(11, 16));
    }
  }, [trigger]);
  const defaultCategory = data?.subCategoryName + ' · ' + data?.mainCategoryName;

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      {isLogin ? (
        <DialogContent className="flex h-fit max-h-[729px] w-fit flex-col items-center gap-24 overflow-y-scroll px-40 py-32">
          <DialogTitle className="w-440 text-center md:w-952">
            모임 만들기 {data?.gatheringId}
          </DialogTitle>
          <FormProvider {...form}>
            <form
              className="flex h-full w-fit flex-col justify-between"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-fit flex-col justify-center sm:flex-row">
                <div className="flex w-fit flex-col gap-24">
                  <div>
                    <DialogDescription>대표 이미지</DialogDescription>
                    <FileInput
                      id="gatheringImage"
                      control={control}
                      {...register('gatheringImage', {
                        required: ERROR_MESSAGE.gatheringImage.required,
                      })}
                    />
                  </div>
                  <div className="flex flex-row gap-12">
                    <div className="relative w-3/6">
                      <DialogDescription>카테고리</DialogDescription>
                      <DropdownInput
                        id="category"
                        control={control}
                        itemTrigger={PLACEHOLDER.category}
                        items={flattenedCategories}
                        defaultValue={data && defaultCategory}
                        {...register('category', {
                          required: ERROR_MESSAGE.category.required,
                        })}
                      />
                    </div>
                    <div className="relative w-3/6">
                      <DialogDescription>지역</DialogDescription>
                      <DropdownInput
                        id="location"
                        control={control}
                        itemTrigger={PLACEHOLDER.location}
                        items={LOCATION}
                        defaultValue={data && data?.location}
                        {...register('location', {
                          required: ERROR_MESSAGE.location.required,
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <DialogDescription>날짜</DialogDescription>
                    <div
                      className={`mx-auto w-full rounded-md border ${dateErrorMsg && isSubmitCheck && 'border-secondary-300'}`}
                    >
                      <Calendar date={date} setDate={setDate} />
                    </div>
                    {dateErrorMsg && isSubmitCheck && (
                      <p className="mt-6 text-body-2Sb text-secondary-300">{dateErrorMsg}</p>
                    )}
                  </div>
                </div>
                <div className="mx-32 my-12 border-l"></div>
                <div className="flex w-fit flex-col gap-40">
                  <div className="w-440">
                    <DialogDescription>오전</DialogDescription>
                    <div className="flex gap-4">
                      {amTime.map((time, i) => (
                        <Button
                          variant="chip"
                          size="chip"
                          className={`${timeErrorMsg && isSubmitCheck && `border border-secondary-300`}`}
                          key={i}
                          selected={selectTime === time}
                          onClick={() => setSelectTime(time)}
                          type="button"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="w-440">
                    <DialogDescription>오후</DialogDescription>
                    <div className="flex flex-wrap gap-4">
                      {pmTime.map((time, i) => (
                        <Button
                          variant="chip"
                          size="chip"
                          className={`${timeErrorMsg && isSubmitCheck && `border border-secondary-300`}`}
                          key={i}
                          selected={selectTime === time}
                          onClick={() => setSelectTime(time)}
                          type="button"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    {isSubmitCheck && timeErrorMsg && (
                      <p className="mt-6 text-body-2Sb text-secondary-300">{timeErrorMsg}</p>
                    )}
                  </div>
                  <div>
                    <DialogDescription>모임명</DialogDescription>
                    <Input
                      type="text"
                      id="name"
                      placeholder={PLACEHOLDER.name}
                      maxLength={30}
                      {...register('name', {
                        required: ERROR_MESSAGE.name.required,
                      })}
                    />
                  </div>
                  <div>
                    <DialogDescription>모임 정원</DialogDescription>
                    <Input
                      type="text"
                      id="capacity"
                      placeholder={PLACEHOLDER.capacity}
                      maxLength={20}
                      {...register('capacity', {
                        required: ERROR_MESSAGE.capacity.required,
                        validate: {
                          isNumber: (value) => !isNaN(value) || ERROR_MESSAGE.capacity.notANumber,
                          isInRange: (value) => {
                            return (
                              (value >= 5 && value <= 20) || ERROR_MESSAGE.capacity.invalidRange
                            );
                          },
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  className={`w-full ${!isValid && 'cursor-default bg-neutral-400 !text-neutral-100 hover:!text-neutral-100'}`}
                  type="submit"
                  onClick={() => handleSubmitButton()}
                >
                  모임 만들기
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      ) : (
        <DialogContent className="w-0">
          <LoginRequired />
        </DialogContent>
      )}
    </Dialog>
  );
}
