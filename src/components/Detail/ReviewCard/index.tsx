import React from 'react';

import Image from 'next/image';

import { Reviews } from '@/types/reviews';

interface ReviewCardProps {
  data: Reviews;
}

export default function ReviewCard({ data }: ReviewCardProps) {
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

  return (
    <div className="flex h-146 w-full flex-col justify-between rounded-md bg-white px-20 py-16 md:h-158">
      <div className="flex flex-col gap-6">
        <div className="relative flex">{renderStars(data.score)}</div>
        <p className="h-40 w-296 text-body-1Sb text-neutral-900 md:h-44 md:w-full">
          {data.comment}
        </p>
      </div>
      <div className="flex items-center gap-8 pt-20">
        <div className="relative h-24 w-24 overflow-hidden rounded-full">
          <Image src={'/images/profileimage.jpeg'} alt="profileImage" fill />
        </div>
        <p className="text-body-2M text-neutral-600">{data.accountInfo.nickname}</p>
        <div className="h-16 w-1 rounded-full bg-neutral-200"></div>
        <p className="text-body-2M text-neutral-400">
          {new Date(data.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
