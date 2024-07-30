import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';

import FloatingBar from '@/components/Detail/FloatingBar';
import ReviewCard from '@/components/Detail/ReviewCard';
import TitleCard from '@/components/Detail/TitleCard';
import NotReview from '@/components/NotReview';

import useFavorite from '@/hooks/useFavorite';
import { useGatheringQuery } from '@/hooks/useGatherings';
import { useGetReviewsAllV2 } from '@/hooks/useReviews';

import { Reviews, ReviewsParams } from '@/types/reviews';

export default function Detail() {
  const router = useRouter();
  const { id: gatheringId } = router.query;
  const queryId = Number(gatheringId);

  const { clickFavorites, isFavorite } = useFavorite();

  const { data, isLoading, isError } = useGatheringQuery(queryId);

  let value: ReviewsParams = {
    mainCategoryName: '',
    subCategoryName: '',
    page: 0,
    size: 20,
    sortBy: 'score',
    sortOrder: 'asc',
  };

  if (data) {
    value = {
      mainCategoryName: data.mainCategoryName,
      subCategoryName: data.subCategoryName,
      page: 0,
      size: 20,
      sortBy: 'score',
      sortOrder: 'asc',
    };
  }

  const { data: allReviewData } = useGetReviewsAllV2(value);
  const reviewData = allReviewData?.reviewInfos || [];

  if (!router.isReady || isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <GNB />
      <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-neutral-50 px-12 md:px-32">
        <div className="flex w-full flex-col items-center pb-90 pt-20 md:pt-32">
          <TitleCard
            data={data}
            clickFavorites={clickFavorites}
            isFavorite={isFavorite}
            queryId={queryId}
          />
          <div className="mt-32 flex items-center gap-8 text-body-1Sb text-neutral-900 md:mt-40 md:text-heading-2Sb">
            이용자들은 이 모임을 이렇게 느꼈어요!
            <Image src={'/icons/ic-message.svg'} alt="ic-message" width={24} height={24} />
          </div>
          {reviewData.length > 0 ? (
            <div className="mx-auto mt-34 grid w-full max-w-[1010px] grid-cols-1 justify-items-center gap-20 md:grid-cols-2">
              {reviewData.map((data: Reviews, index: number) => (
                <ReviewCard key={index} data={data} />
              ))}
            </div>
          ) : (
            <NotReview type="detailReview" />
          )}
        </div>
        <FloatingBar data={data} queryId={queryId} />
      </div>
      <div className="mb-84">
        <Footer />
      </div>
    </>
  );
}
