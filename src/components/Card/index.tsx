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
    <div className="h-230 relative flex w-[1216px] gap-20 rounded-lg bg-white p-20">
      <div className="h-190 w-373 relative">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md" />
        {data.confirmed && (
          <div className="bg-secondary-300 w-81 text-body-2M absolute flex h-36 items-center justify-center rounded-br-md rounded-tl-md text-white">
            개설확정
          </div>
        )}
      </div>
      <div className="relative text-gray-600">
        <div>
          <div className="flex gap-6">
            <p className="text-primary-300">{data.category}</p>
            <p className="text-neutral-500">{data.place}</p>
          </div>
          <div className="flex gap-6">
            <p className="text-secondary-300">{data.deadline}</p>·
            <p className="text-neutral-500">{data.date}</p>·
            <p className="text-neutral-500">{data.time}</p>
          </div>
          <div className="text-heading-2M">{data.title}</div>
        </div>
        <div className="absolute bottom-11 flex items-center justify-center gap-16">
          {data.member > 5 ? (
            <Image src="/icons/overPersonIcon.svg" alt="overPersonIcon" width={24} height={24} />
          ) : (
            <Image src="/icons/basePersonIcon.svg" alt="basePersonIcon" width={24} height={24} />
          )}

          <div className="text-14">{data.member}/20</div>
          <div className="w-422 relative h-6 rounded-full bg-gray-100">
            <div
              className="bg-secondary-blue-300 absolute h-6 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      {data.member >= 20 ? (
        <Button className="bottom-19 h-42 w-288 absolute right-20" disabled variant={'secondary'}>
          참여마감
        </Button>
      ) : (
        <Button className="bottom-19 h-42 w-288 absolute right-20" variant={'secondary'}>
          참여하기
        </Button>
      )}

      <div className="right-26 top-26 absolute">
        <button type="button" className="relative h-48 w-48" onClick={handleClick}>
          <Image
            src={isBookmarked ? '/icons/heart-pink.svg' : '/icons/heart-gray.svg'}
            alt="찜 버튼"
            fill
            className="absolute"
          />
        </button>
      </div>
    </div>
  );
}
