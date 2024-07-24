import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import GNB from '@/components/common/GNB';

import FloatingBar from '@/components/Detail/FloatingBar';
import ReviewCard from '@/components/Detail/ReviewCard';
import TitleCard from '@/components/Detail/TitleCard';
import reviewData from '@/components/Detail/reviewData.json';
import NotReview from '@/components/NotReview';

import { useGatheringQuery } from '@/hooks/useGatherings';

export default function Detail() {
  const isReview = true;
  const router = useRouter();
  const { id: gatheringId } = router.query;

  const queryId = Number(gatheringId);

  const { data, isLoading, isError } = useGatheringQuery(queryId);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  console.log(data);

  return (
    <>
      <GNB />
      <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-neutral-50 px-12 md:px-32">
        <div className="flex w-full flex-col items-center pb-90 pt-32">
          <TitleCard data={data} />
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
        <FloatingBar data={data} queryId={queryId} />
      </div>
    </>
  );
}
