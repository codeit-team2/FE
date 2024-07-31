import React from 'react';

import Image from 'next/image';

import { Scores } from '@/types/reviews';

interface StarRatingAverageProps {
  data: Scores;
}

export default function StarRatingAverage({ data }: StarRatingAverageProps) {
  const scoresCount = [
    data.scoreFiveCount,
    data.scoreFourCount,
    data.scoreThreeCount,
    data.scoreTwoCount,
    data.scoreOneCount,
  ];

  const totalReviews = scoresCount.reduce((total, score) => total + score, 0);

  const renderStars = () => {
    const starArray = [];
    const averageScore = Math.floor(data.averageScore);

    for (let i = 0; i < 5; i++) {
      starArray.push(
        <div key={i} className="relative h-24 w-24 sm:h-32 sm:w-32 md:h-44 md:w-44">
          <Image
            src={i < averageScore ? '/icons/ic-star-on.svg' : '/icons/ic-star-off.svg'}
            alt={i < averageScore ? 'Filled star' : 'Empty star'}
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
          <p className="text-heading-1Sb md:text-average">{data.averageScore.toFixed(1)}</p>
          <p className="text-body-2Sb text-neutral-400 md:text-body-1Sb">/5 ({totalReviews})</p>
        </div>
        <div className="flex">{renderStars()}</div>
      </div>
      <div className="flex w-full max-w-299 flex-col gap-7">
        {scoresCount.map((score, index) => {
          const progressPercentage = totalReviews ? (score / totalReviews) * 100 : 0;

          return (
            <div key={index} className="text-body-2Sb">
              <div className="flex items-center justify-start gap-12">
                <p className="w-full max-w-22">{5 - index}점</p>
                <div className="relative h-6 w-full rounded-full bg-neutral-100 md:w-228">
                  <div
                    className="absolute h-6 rounded-full bg-secondary-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-neutral-400">{score}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
