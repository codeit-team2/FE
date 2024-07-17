import React from 'react';

import Image from 'next/image';

import GNB from '@/components/common/GNB';

import FloatingBar from '@/components/Detail/FloatingBar';
import ReviewCard from '@/components/Detail/ReviewCard';
import TitleCard from '@/components/Detail/TitleCard';
import reviewData from '@/components/Detail/reviewData.json';
import NotReview from '@/components/NotReview';

const titleData = {
  gatheringId: 101,
  location: '중랑구',
  mainCategory: '운동',
  subCategory: '러닝',
  name: '나이트 러닝으로 중랑천 함께 뛰어요 초보 환영',
  dateTime: '2024-07-18T17:00:00',
  participantCount: 15,
  capacity: 20,
  gatheringImageUrl: '/images/러닝이미지.jpg',
  createdAt: 'yyyy-mm-ddTHH:mm:ss',
  canceledAt: 'yyyy-mm-ddTHH:mm:ss',
};

export default function Detail() {
  const isReview = true;

  return (
    <>
      <GNB />
      <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-neutral-50 px-12 md:px-32">
        <div className="flex w-full flex-col items-center pb-90 pt-32">
          <TitleCard data={titleData} />
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
        <FloatingBar data={titleData} />
      </div>
    </>
  );
}
