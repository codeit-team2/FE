import React from 'react';

import Image from 'next/image';

import { Reviews } from '@/types/reviews';

interface UserReviewProps {
  data: Reviews;
}

export default function UserReview({ data }: UserReviewProps) {
  const renderStars = (starCount: number) => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(
        <div key={i} className="relative h-24 w-24">
          <Image
            src={i < starCount ? '/icons/ic-star-on.svg' : '/icons/ic-star-off.svg'}
            alt={i < starCount ? 'Filled star' : 'Empty star'}
            fill
          />
        </div>,
      );
    }
    return starArray;
  };

  const formattedDate = new Date(data.createdAt).toLocaleDateString();
  const cleanDate = formattedDate.replace(/\.$/, '');

  return (
    <div className="mx-auto flex h-351 w-full max-w-[1010px] flex-col gap-16 rounded-lg bg-white px-8 pb-20 pt-8 md:h-230 md:flex-row md:gap-20 md:p-20">
      <div className="relative h-163 w-full md:h-190 md:w-373">
        <Image
          src={`${data.gatheringInfo.gatheringImageUrl}`}
          alt={`{data.cardImage}`}
          fill
          className="rounded-md"
          objectFit="cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between p-10 md:mx-0 md:w-1/2">
        <div>
          <div className="mb-6 flex">{renderStars(data.score)}</div>
          <div
            className="text-body-1S h-44 truncate text-ellipsis whitespace-normal md:h-56 md:text-heading-2M"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {data.comment}
          </div>
        </div>
        <div className="flex h-45 flex-col gap-4 text-body-2Sb text-neutral-500">
          <div className="flex gap-6">
            <div className="text-primary-300">{data.gatheringInfo.subCategoryName} 모임 이용</div>
            <div>{data.gatheringInfo.location}</div>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <Image
                src={
                  data.accountInfo.profileImageUrl
                    ? `${data.accountInfo.profileImageUrl}`
                    : '/icons/ic-profile-gray.svg'
                }
                alt="profileImage"
                fill
                objectFit="cover"
              />
            </div>
            <p className="text-neutral-700">{data.accountInfo.nickname}</p>
            <div className="h-16 w-1 rounded-full bg-neutral-200"></div>
            <p>{cleanDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
