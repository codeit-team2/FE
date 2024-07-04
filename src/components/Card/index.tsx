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
    <div className="h-230 relative flex w-full gap-20 rounded-lg bg-white p-20">
      <div className="h-190 w-373 relative">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md" />
        {data.confirmed && (
          <div className="bg-secondary-300 w-81 text-body-2M absolute flex h-36 items-center justify-center rounded-br-md rounded-tl-md text-white">
            개설확정
          </div>
        )}
      </div>

      <div className="gap-30 relative flex w-full flex-col items-start justify-between text-gray-600">
        <Description data={data} />

        <div className="mb-11 flex w-full items-center justify-center gap-16">
          {data.member > 5 ? (
            <>
              <Person data={data} />
              {/* <Image src="/icons/overPersonIcon.svg" alt="overPersonIcon" width={24} height={24} />
              <div className="text-14 text-primary-300">{data.member}/20</div> */}
              <ProgressPercentage data={data} />
            </>
          ) : (
            <>
              <Person data={data} />
              {/* <Image src="/icons/basePersonIcon.svg" alt="basePersonIcon" width={24} height={24} />
              <div className="text-14 text-neutral-500">{data.member}/20</div> */}
              <ProgressPercentage data={data} />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Liked onClick={handleClick} isBookmarked={isBookmarked} />

        {data.member >= 20 ? (
          <Button className="h-42 w-288 mb-2" disabled variant={'secondary'}>
            참여마감
          </Button>
        ) : (
          <Button className="h-42 w-288 mb-2" variant={'secondary'}>
            참여하기
          </Button>
        )}
      </div>
    </div>
  );
}
