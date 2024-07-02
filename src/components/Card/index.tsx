import Image from 'next/image';
import React from 'react';

export default function Card() {
  return (
    <>
      <div className="flex h-230 w-[1216px] gap-20 rounded-30 bg-white p-20">
        <div className="relative h-190 w-373">
          <Image src={'/images/러닝이미지.jpg'} alt="러닝이미지" fill className="rounded-20" />
        </div>
        <div className='text-text-gray'>
          <div className="flex gap-6">
            <p className='text-text-blue'>러닝</p>
            <p>중랑구</p>
          </div>
          <div className="flex gap-6">
            <p className='text-text-red'>오늘마감</p>·<p>7월 2일 화요일</p>·<p>오전 11:11</p>
          </div>
          <div className='text-black text-24 font-medium'>중랑천 함께 뛰어요</div>
        </div>
      </div>
    </>
  );
}
