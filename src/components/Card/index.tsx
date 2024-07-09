import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Liked from '@/components/Card/Liked';
import Description from '@/components/Card/Description';
import ProgressPercentage from '@/components/Card/ProgressPercentage';
import Person from '@/components/Card/Person';

export default function Card({ data }: any) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  return (
    <div className="relative flex h-230 w-full gap-20 rounded-lg bg-white p-20">
      <div className="relative h-190 w-373">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md" />
        {data.confirmed && (
          <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
            개설확정
          </div>
        )}
      </div>

      <div className="relative flex w-full flex-col items-start justify-between gap-30 text-gray-600">
        <Description data={data} />

        <div className="mb-11 flex w-full items-center justify-center gap-16">
          {data.member > 5 ? (
            <>
              <Person data={data} />
              <ProgressPercentage data={data} />
            </>
          ) : (
            <>
              <Person data={data} />
              <ProgressPercentage data={data} />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Liked onClick={handleClick} isBookmarked={isBookmarked} />

        {data.member >= 20 ? (
          <Button className="mb-2 h-42 w-288" disabled variant={'secondary'}>
            참여마감
          </Button>
        ) : (
          <Button className="mb-2 h-42 w-288" variant={'secondary'}>
            참여하기
          </Button>
        )}
      </div>
    </div>
  );
}
