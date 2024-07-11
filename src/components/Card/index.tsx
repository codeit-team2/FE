import { Data } from '@/types';

import React, { useState } from 'react';

import { Button } from '../ui/button';
import Image from 'next/image';

import Description from '@/components/Card/Description';
import Liked from '@/components/Card/Liked';
import Person from '@/components/Card/Person';
import ProgressPercentage from '@/components/Card/ProgressPercentage';

interface CardProps {
  data: Data;
  ClickFavorites: (item: string) => void;
  isFavorite: (item: string) => boolean;
}

export default function Card({ data, ClickFavorites, isFavorite }: CardProps) {
  // const [isBookmarked, setIsBookmarked] = useState(false);
  const handleClick = (data: Data) => {
    if (ClickFavorites) {
      ClickFavorites(data.category);
    }
    // setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div className="relative h-163 w-full md:h-190 md:w-373">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md" />
        {data.confirmed && (
          <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
            개설확정
          </div>
        )}
      </div>
      <Liked onClick={() => handleClick(data)} isBookmarked={isFavorite(data.category)} />
      <div className="relative flex grow flex-col items-start justify-between text-gray-600">
        <Description data={data} />
        <div className="mb-11 flex w-full items-center justify-center gap-8 md:gap-16">
          <div className="flex w-full items-center gap-16">
            <Person data={data} />
            <ProgressPercentage data={data} />
          </div>
          {data.member >= 20 ? (
            <Button className="mb-2 h-42 w-full md:w-200 lg:w-288" disabled variant={'secondary'}>
              참여마감
            </Button>
          ) : (
            <Button className="mb-2 h-42 w-full md:w-200 lg:w-288" variant={'secondary'}>
              참여하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
