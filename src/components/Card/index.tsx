import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';

export default function Card({ data }: any) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  const progressPercentage = (data.member / 20) * 100;

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
        <div className="mb-4 flex flex-col">
          <div className="flex gap-6">
            <p className="text-primary-300">{data.category}</p>
            <p className="text-neutral-500">{data.place}</p>
          </div>
          <div className="mb-8 flex gap-6">
            <p className="text-secondary-300">{data.deadline}</p>·
            <p className="text-neutral-500">{data.date}</p>·
            <p className="text-neutral-500">{data.time}</p>
          </div>
          <div className="text-heading-2M">{data.title}</div>
        </div>

        <div className="mb-11 flex w-full items-center justify-center gap-16">
          {data.member > 5 ? (
            <>
              <Image src="/icons/overPersonIcon.svg" alt="overPersonIcon" width={24} height={24} />
              <div className="text-14 text-primary-300">{data.member}/20</div>
              <div className="relative h-6 w-full rounded-full bg-gray-100">
                <div
                  className="bg-primary-300 absolute h-6 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <Image src="/icons/basePersonIcon.svg" alt="basePersonIcon" width={24} height={24} />
              <div className="text-14 text-neutral-500">{data.member}/20</div>
              <div className="relative h-6 w-full rounded-full bg-gray-100">
                <div
                  className="bg-primary-300 absolute h-6 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button type="button" className="relative h-48 w-48" onClick={handleClick}>
          <Image
            src={isBookmarked ? '/icons/heart-pink.svg' : '/icons/heart-gray.svg'}
            alt="찜 버튼"
            fill
            className="absolute"
          />
        </button>

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
