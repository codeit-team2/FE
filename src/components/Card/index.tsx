import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';

export default function Card() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  return (
    <>
      <div className="relative flex h-230 w-[1216px] gap-20 rounded-30 bg-white p-20">
        <div className="relative h-190 w-373">
          <Image src={'/images/러닝이미지.jpg'} alt="러닝이미지" fill className="rounded-20" />
        </div>
        <div className="relative text-text-gray">
          <div>
            <div className="flex gap-6">
              <p className="text-text-blue">러닝</p>
              <p>중랑구</p>
            </div>
            <div className="flex gap-6">
              <p className="text-text-red">오늘마감</p>·<p>7월 2일 화요일</p>·<p>오전 11:11</p>
            </div>
            <div className="text-24 font-medium text-black">중랑천 함께 뛰어요</div>
          </div>
          <div className="absolute bottom-11 flex items-center justify-center gap-16">
            <div className="text-14">18/20</div>
            <div className="h-6 w-422 rounded-full bg-gray-100"></div>
          </div>
        </div>
        <Button className="absolute bottom-19 right-20 h-42 w-288">참여하기</Button>
        <div className='absolute top-26 right-26'>
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
    </>
  );
}
