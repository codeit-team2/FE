import React from 'react';
import TitleCard from '@/components/Detail/TitleCard';
import GNB from '@/components/common/GNB';
import mockData from '@/components/Detail/mockData.json';
import reviewData from '@/components/Detail/reviewData.json';
import Image from 'next/image';
import FloatingBar from '@/components/Detail/FloatingBar';
import ReviewCard from '@/components/Detail/ReviewCard';

export default function Detail() {
  const isReview = true;

  return (
    <div
      style={{ height: 'calc(100vh - 60px)' }}
      className="mx-auto flex min-h-screen w-full flex-col items-center bg-neutral-50"
    >
      <GNB />
      <div className="flex flex-col items-center pt-32">
        <TitleCard data={mockData[0]} />
        <div className="flex items-center gap-8 mt-42 text-heading-2Sb text-neutral-900">
          이용자들은 이 모임을 이렇게 느꼈어요!
          <Image src={'/icons/messageicon.svg'} alt="messageicon" width={24} height={24} />
        </div>
        {isReview ? (
          <div className="mx-auto mt-34 grid w-full max-w-[1010px] grid-cols-1 gap-20 md:grid-cols-2">
            {reviewData.map((data, index) => (
              <ReviewCard key={index} data={data} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-20 pt-16">
            <div className="flex gap-12">
              <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
              <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
            </div>
            <p className="text-body-1M text-neutral-500">앗, 아직 리뷰가 없어요</p>
          </div>
        )}
      </div>
      <FloatingBar data={mockData[0]} />
    </div>
  );
}
