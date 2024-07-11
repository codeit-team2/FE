import React from 'react';

import Image from 'next/image';

export default function StarRatingAverage({ mockData }: any) {
  const exerciseArray = mockData.categories.exercise;
  const scores = [5, 4, 3, 2, 1];

  const renderStars = () => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(
        <div key={i} className="relative h-24 w-24 sm:h-32 sm:w-32 md:h-44 md:w-44">
          <Image
            src={i < mockData.star ? '/icons/ic-star-on.svg' : '/icons/ic-star-off.svg'}
            alt={i < mockData.star ? 'Filled star' : 'Empty star'}
            fill
          />
        </div>,
      );
    }
    return starArray;
  };

  return (
    <div className="flex h-180 w-full max-w-[1010px] items-center justify-center gap-22 rounded-lg bg-white p-20 md:gap-80">
      <div className="flex h-130 w-full max-w-284 flex-col items-center justify-center gap-4 rounded-md bg-neutral-50">
        <div className="flex items-baseline gap-2">
          <p className="md:text-average text-heading-1Sb">4.7</p>
          <p className="text-body-2Sb text-neutral-400 md:text-body-1Sb">/5 (50)</p>
        </div>
        <div className="flex">{renderStars()}</div>
      </div>
      <div className="flex w-full max-w-299 flex-col gap-7">
        {scores.map((score) => (
          <div key={score} className="text-body-2Sb">
            <div className="flex items-center justify-center gap-12">
              <p className="w-full max-w-22">{score}점</p>
              <div className="relative h-6 w-full rounded-full bg-neutral-100 md:w-228">
                <div
                  className="absolute h-6 rounded-full bg-secondary-300"
                  style={{ width: `47%` }}
                />
              </div>
              <p>total</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
