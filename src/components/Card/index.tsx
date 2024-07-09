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
    <div className="relative flex w-full flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div className="relative h-163 w-full md:h-190 md:w-373">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md" />
        {data.confirmed && (
          <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
            개설확정
          </div>
        )}
      </div>
      <Liked onClick={handleClick} isBookmarked={isBookmarked} />
      {/* px-12 */}
      <div className="relative flex w-full flex-col items-start justify-between text-gray-600">
        <Description data={data} />
        <div className="mb-11 flex w-full items-center justify-center gap-16">
          <Person data={data} />
          <ProgressPercentage data={data} />
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
