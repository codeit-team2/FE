import React from 'react';

import Image from 'next/image';

import { ReviewCard } from '@/types/testDataType';

interface UserReviewProps {
  mockData: ReviewCard;
}

export default function UserReview({ mockData }: UserReviewProps) {
  const exerciseList = mockData.categories.Exercise;

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
    <>
      {exerciseList.map((data, index) => {
        return (
          <div
            key={index}
            className="mx-auto flex h-351 w-full max-w-[1010px] flex-col gap-16 rounded-lg bg-white px-8 pb-20 pt-8 md:h-230 md:flex-row md:gap-20 md:p-20"
          >
            <div className="relative h-163 w-full md:h-190 md:w-373">
              <Image
                src={`${data.cardImage}`}
                alt={`{data.cardImage}`}
                fill
                className="rounded-md"
                objectFit="cover"
              />
            </div>
            <div className="flex w-full flex-col justify-between px-10 md:mx-0 md:w-1/2">
              <div>
                <div className="flex">{renderStars(data.star)}</div>
                <div
                  className="text-body-1S mb-36 h-44 truncate text-ellipsis whitespace-normal md:h-56 md:text-heading-2M"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {data.comment}
                </div>
              </div>
              <div className="flex flex-col gap-4 text-body-2Sb text-neutral-500">
                <div className="flex gap-6">
                  <div className="text-primary-300">{data.group} 모임 이용</div>
                  <div>{data.place}</div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full">
                    <Image src={'/images/profileimage1.jpeg'} alt="profileImage" fill />
                  </div>
                  <p className="text-neutral-700">{data.nickname}</p>
                  <div className="h-16 w-1 rounded-full bg-neutral-200"></div>
                  <p>{new Date(data.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
