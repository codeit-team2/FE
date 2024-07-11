import React from 'react';

import Image from 'next/image';

export default function UserReview({ mockData }: any) {
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
      {exerciseList.map((data: any, index: any) => {
        return (
          <div
            key={index}
            className="mx-auto flex h-351 md:h-230 w-full max-w-[1010px] flex-col gap-20 rounded-lg bg-white p-20 md:flex-row"
          >
            <div className="relative h-190 w-373 bg-yellow-50">
              <Image
                src={`${data.cardImage}`}
                alt={`{data.cardImage}`}
                fill
                className="rounded-md"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col md:gap-36 gap-12">
              <div>
                <div className="flex">{renderStars(data.star)}</div>
                <div
                  className="text-body-1S h-44 w-296 truncate text-ellipsis whitespace-normal md:h-56 md:w-578 md:text-heading-2M"
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
                  <p className="text-neutral-600">{data.nickname}</p>
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
