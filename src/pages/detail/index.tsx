import React from 'react';
import TitleCard from '@/components/Detail/TitleCard';
import GNB from '@/components/common/GNB';
import mockData from '@/components/Detail/mockData.json';
import reviewData from '@/components/Detail/reviewData.json';
import Image from 'next/image';
import FloatingBar from '@/components/Detail/FloatingBar';
import ReviewCard from '@/components/Detail/ReviewCard';
import NotReview from '@/components/NotReview';

export default function Detail() {
  const isReview = false;

  return (
    <>
      <GNB />
      <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-neutral-50 px-12 md:px-32">
        <div className="flex w-full flex-col items-center pt-32">
          <TitleCard data={mockData[0]} />
          <div className="mt-42 flex items-center gap-8 text-body-1Sb text-neutral-900 md:text-heading-2Sb">
            이용자들은 이 모임을 이렇게 느꼈어요!
            <Image src={'/icons/ic-message.svg'} alt="ic-message" width={24} height={24} />
          </div>
          {isReview ? (
            <div className="mx-auto mt-34 grid w-full max-w-[1010px] grid-cols-1 justify-items-center gap-20 md:grid-cols-2">
              {reviewData.map((data, index) => (
                <ReviewCard key={index} data={data} />
              ))}
            </div>
          ) : (
            <NotReview />
          )}
        </div>
        <FloatingBar data={mockData[0]} />
      </div>
    </>
  );
}
