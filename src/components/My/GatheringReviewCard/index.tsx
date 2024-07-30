import React from 'react';

import Image from 'next/image';

import ReviewModal from '@/components/common/Modal/Review';

import { Button } from '@/components/ui/button';

import { formatDate } from '@/lib/utils';

import { useDeleteReviews, useGetGatheringReview } from '@/hooks/useReviews';

interface Props {
  gatheringId: number;
}

export default function GatheringReviewCard({ gatheringId }: Props) {
  const { data } = useGetGatheringReview(gatheringId);

  const renderStars = (score: number) => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(
        <div key={i} className="relative h-24 w-24">
          <Image
            src={i < score ? '/icons/ic-star-on.svg' : '/icons/ic-star-off.svg'}
            alt={i < score ? 'Filled star' : 'Empty star'}
            fill
          />
        </div>,
      );
    }
    return starArray;
  };

  const { mutate } = useDeleteReviews();

  // 리뷰 삭제 버튼
  const handleReviewDeleteButton = (reviewId: number) => {
    const value = {
      reviewId: reviewId,
    };

    mutate(value, {
      onSuccess: () => {
        alert('리뷰 삭제 완료');
        window.location.reload();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    data && (
      <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
        <div className="relative h-163 w-full md:h-190 md:w-373">
          <Image
            src={data.gatheringInfo.gatheringImageUrl}
            alt={data.accountInfo.nickname}
            fill
            className="rounded-md"
          />
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-neutral-700 text-body-2M text-white">
            이용완료
          </div>
        </div>
        <div className="mt-10 flex grow flex-col justify-between">
          <div>
            <div className="flex flex-row">{renderStars(data.score)}</div>
            <p className="mt-6 max-h-56 w-220 min-w-230 truncate text-body-1Sb md:text-heading-2M">
              {data.comment}
            </p>
            <div className="mt-12 flex flex-row gap-6 text-body-3Sb">
              <p className="text-primary-300">{data.gatheringInfo.subCategoryName} 모임 이용</p>
              <p className="text-neutral-500">{data.gatheringInfo.location}</p>
            </div>
            <p className="mt-4 text-body-3Sb text-neutral-500">
              {formatDate({ date: data.createdAt })?.formattedDate} 작성
            </p>
          </div>
          <div className="flex flex-row items-center justify-end gap-8">
            <ReviewModal type="modify" reviewId={data.reviewId} />
            <Button variant={'secondary'} onClick={() => handleReviewDeleteButton(data.reviewId)}>
              <Image src="/icons/ic-delete.svg" alt="delete" width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
