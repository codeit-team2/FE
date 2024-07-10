import { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler, FieldValues, FormProvider } from 'react-hook-form';
import { ERROR_MESSAGE, PLACEHOLDER } from '@/constants/formMessages';
import Textarea from '@/components/common/Textarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '@/components/ui/dialog';

export default function ReviewModal() {
  const [rating, setRating] = useState(5);

  const form = useForm();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = form;

  console.log(rating);

  const onSubmit: SubmitHandler<FieldValues> = (value: FieldValues) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>후기 작성하기</p>
      </DialogTrigger>
      <DialogOverlay className="bg-neutral-950/80 md:bg-transparent" />
      <DialogContent className="w-320 rounded-md px-20 py-32 md:w-520 md:px-40 md:py-32">
        <DialogTitle>후기 작성하기</DialogTitle>
        <FormProvider {...form}>
          <form
            className="flex flex-col gap-50"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-col gap-24">
              <div>
                <p className="mb-6 text-center text-body-2Sb">만족스러운 모임이었나요?</p>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, index) =>
                    index < rating ? (
                      <Image
                        className="cursor-pointer"
                        key={index}
                        src={'/icons/ic-star-on.svg'}
                        alt="별 아이콘"
                        width={44}
                        height={44}
                        onClick={() => setRating(index + 1)}
                      />
                    ) : (
                      <Image
                        className="cursor-pointer"
                        key={index}
                        src={'/icons/ic-star-off.svg'}
                        alt="빈 별 아이콘"
                        width={44}
                        height={44}
                        onClick={() => setRating(index + 1)}
                      />
                    ),
                  )}
                </div>
              </div>
              <div className="w-full">
                <p className="mb-6 text-center text-body-2Sb">모임에 대한 소감을 남겨주세요</p>
                <Textarea
                  id="review"
                  placeholder={PLACEHOLDER.review}
                  maxLength={50}
                  {...register('review', {
                    required: ERROR_MESSAGE.review.required,
                    minLength: {
                      value: 2,
                      message: ERROR_MESSAGE.review.min,
                    },
                    maxLength: {
                      value: 50,
                      message: ERROR_MESSAGE.review.max,
                    },
                  })}
                />
              </div>
            </div>
            <Button className={`w-full`} variant="secondary" type="submit" disabled={!isValid}>
              후기 등록하기
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
