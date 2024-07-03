import React from 'react';
import TitleCard from '@/components/Detail/TitleCard';
import GNB from '@/components/common/GNB';
import mockData from '@/components/Detail/mockData.json';
import Image from 'next/image';

export default function Detail() {
  const isReview = false;

  return (
    <>
      <GNB />
      <div
        style={{ height: 'calc(100vh - 60px)' }}
        className="mx-auto flex h-screen w-full flex-col items-center bg-neutral-50 pt-32"
      >
        {mockData.map((data, index) => (
          <TitleCard key={index} data={data} />
        ))}
        <div className="flex items-center gap-8 pt-42 text-heading-2Sb text-neutral-900">
          이용자들은 이 모임을 이렇게 느꼈어요!
          <Image src={'/icons/messageicon.svg'} alt="messageicon" width={24} height={24} />
        </div>
        {isReview ? (
          <>
            <div>a</div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-20 pt-72">
              <div className="flex gap-12">
                <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
                <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
              </div>
              <p className='text-neutral-500 text-body-1M'>앗, 아직 리뷰가 없어요</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
