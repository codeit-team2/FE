import { CATEGORY, LOCATION } from '@/constants/dropdownItems';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import { amTime, pmTime } from '@/constants/timeItems';

import React, { useEffect, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Calendar from '@/components/common/Calendar';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import Input from '@/components/common/Input';

import DropdownInput from '@/components/MakeClub/DropdownInput';
import FileInput from '@/components/MakeClub/FileInput';
import { Button } from '@/components/ui/button';

import { isDateBeforeToday } from '@/lib/utils';

import useCheckLogin from '@/hooks/useCheckLogin';
import { usePostGatherings, usePutGatherings } from '@/hooks/useGatherings';
import useScrollbarAndScrollState from '@/hooks/useIsScrollbarVisible';
import useIsTablet from '@/hooks/useIsTablet';

import { Gathering } from '@/types/gatherings';

interface Props {
  trigger: 'text' | 'plus' | 'modify';
  data?: Gathering;
}

export default function MobileMakeClubPage({ trigger, data }: Props) {
  const [selectTime, setSelectTime] = useState<string>();
  const [isSubmitCheck, setIsSubmitCheck] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [gatheringId, setGatheringId] = useState<number>(0);

  useCheckLogin();

  const [scrollRef, isScrollbarVisible] = useScrollbarAndScrollState<HTMLDivElement>(true);

  const router = useRouter();
  const isTablet = useIsTablet();

  useEffect(() => {
    if (!isTablet) {
      router.push('/');
    }
  }, [isTablet, router]);

  console.log(isScrollbarVisible);

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
              window.location.reload();
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
  // const isLogin = true;

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
  }, [data, trigger, setValue]);
  const defaultCategory = data?.subCategoryName + ' · ' + data?.mainCategoryName;

  return (
    <>
      <GNB />
      <div className="border-b-8 border-b-neutral-50 px-20 pb-50 pt-32">
        <p className="mb-32 text-center text-heading-2Sb">모임 만들기</p>
        <FormProvider {...form}>
          <form
            className="flex h-full flex-col justify-between gap-66 overflow-hidden"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-full w-full flex-col" ref={scrollRef}>
              <div className="mb-32 flex flex-1 flex-col gap-50">
                <div>
                  <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                    대표 이미지
                  </label>
                  <FileInput
                    id="gatheringImage"
                    control={control}
                    {...register('gatheringImage', {
                      required: ERROR_MESSAGE.gatheringImage.required,
                    })}
                  />
                </div>
                <div className="flex w-full flex-row gap-12">
                  <div className="relative w-[calc(50%-6px)]">
                    <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                      카테고리
                    </label>
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
                  <div className="relative w-[calc(50%-6px)]">
                    <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                      지역
                    </label>
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
                  <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                    날짜
                  </label>
                  <div
                    className={`rounded-md border ${dateErrorMsg && isSubmitCheck && 'border-secondary-300'}`}
                  >
                    <Calendar date={date} setDate={setDate} />
                  </div>
                  {dateErrorMsg && isSubmitCheck && (
                    <p className="mt-6 text-body-2Sb text-secondary-300">{dateErrorMsg}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-40">
                <div>
                  <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                    오전
                  </label>
                  <div className="flex flex-wrap gap-x-8 gap-y-6">
                    {amTime.map((time, i) => (
                      <Button
                        variant="chip"
                        size="chip"
                        className={`h-34 w-74 ${timeErrorMsg && isSubmitCheck && `border border-secondary-300`}`}
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
                <div>
                  <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                    오후
                  </label>
                  <div className="flex flex-wrap gap-x-8 gap-y-6">
                    {pmTime.map((time, i) => (
                      <Button
                        variant="chip"
                        size="chip"
                        className={`h-34 w-74 ${timeErrorMsg && isSubmitCheck && `border border-secondary-300`}`}
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
                <div className="mb-58">
                  <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                    모임명
                  </label>
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
              </div>
              <div>
                <label className="mb-6 block text-body-2Sb" htmlFor="nickname">
                  모임 정원
                </label>
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
                        return (value >= 5 && value <= 20) || ERROR_MESSAGE.capacity.invalidRange;
                      },
                    },
                  })}
                />
              </div>
            </div>
            {/* <div className=""> */}
            <Button
              className={`w-full ${!isValid && 'cursor-default bg-neutral-400 !text-neutral-100 hover:!text-neutral-100'}`}
              type="submit"
              onClick={() => handleSubmitButton()}
            >
              {trigger === 'modify' ? '모임 수정하기' : '모임 만들기'}
            </Button>
            {/* </div> */}
          </form>
        </FormProvider>
      </div>
      <Footer />
    </>
  );
}
