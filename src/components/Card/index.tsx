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
    <div className="relative flex h-230 w-[1216px] gap-20 rounded-30 bg-white p-20">
      <div className="relative h-190 w-373">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-20" />
        {data.confirmed && (
          <div className="bg-secondary-red-300 absolute flex h-36 w-81 items-center justify-center rounded-br-20 rounded-tl-20 text-14 text-white">
            개설확정
          </div>
        )}
      </div>
      <div className="relative text-gray-600">
        <div>
          <div className="flex gap-6">
            <p className="text-secondary-blue-300">{data.category}</p>
            <p>{data.place}</p>
          </div>
          <div className="flex gap-6">
            <p className="text-secondary-red-300">{data.deadline}</p>·<p>{data.date}</p>·
            <p>{data.time}</p>
          </div>
          <div className="text-24 font-medium text-black">{data.title}</div>
        </div>
        <div className="absolute bottom-11 flex items-center justify-center gap-16">
          <div className="text-14">{data.member}/20</div>
          <div className="relative h-6 w-422 rounded-full bg-gray-100">
            <div
              className="bg-secondary-blue-300 absolute h-6 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <Button className="absolute bottom-19 right-20 h-42 w-288">참여하기</Button>
      <div className="absolute right-26 top-26">
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
