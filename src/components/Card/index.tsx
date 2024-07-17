import React, { useState } from 'react';

import Bookmark from '../common/Bookmark';
import { Button } from '../ui/button';
import Image from 'next/image';

import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import ProgressPercentage from '@/components/Card/ProgressPercentage';

import { TestCardData } from '@/types/testDataType';

interface CardProps {
  data: TestCardData;
  clickFavorites: (item: string) => void;
  isFavorite: (item: string) => boolean;
}

export default function Card({ data, clickFavorites, isFavorite }: CardProps) {
  const [isBookmarked, setIsBookmarked] = useState(isFavorite(data.category));

  const handleToggleBookmark = (newState: boolean) => {
    setIsBookmarked(newState);
    clickFavorites(data.category);
  };

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div className="relative h-163 w-full md:h-190 md:w-373">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md object-cover" />
        {data.confirmed && (
          <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
            개설확정
          </div>
        )}
      </div>
      <div className="relative flex grow flex-col items-start justify-between text-gray-600">
        <Description data={data} />
        <div className="mb-11 flex w-full items-center justify-center gap-8 md:gap-16">
          <div className="flex w-full items-center gap-16">
            <Person data={data} />
            <ProgressPercentage data={data} />
          </div>
          <Button
            className="mb-2 h-42 w-full md:w-200 lg:w-288"
            variant={'secondary'}
            disabled={data.member >= 20}
          >
            {data.member >= 20 ? '참여마감' : '참여하기'}
          </Button>
        </div>
      </div>
      <div className="absolute right-30 top-30">
        <Bookmark isBookmarked={isBookmarked} onToggleBookmark={handleToggleBookmark} />
      </div>
    </div>
  );
}
