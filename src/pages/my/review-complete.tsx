import React from 'react';

import Loading from '@/components/Loading';
import ReviewCard from '@/components/My/ReviewCard';
import NotReview from '@/components/NotReview';

import { useGetReviewsMine } from '@/hooks/useReviews';

import { Reviews, ReviewsParams } from '@/types/reviews';

export default function ReviewComplete() {
  // getReviewsMine api 호출
  const value: ReviewsParams = {
    page: 0,
    size: 5,
    sortBy: 'score',
    sortOrder: 'asc',
  };

  const { data: reviewsDatas, isPending } = useGetReviewsMine(value);

  return reviewsDatas && reviewsDatas.length > 0 ? (
    reviewsDatas.map((data: Reviews, index: number) => <ReviewCard key={index} data={data} />)
  ) : (
    <>{isPending ? <Loading width="300" height="300" /> : <NotReview type="reviewComplete" />}</>
  );
}
