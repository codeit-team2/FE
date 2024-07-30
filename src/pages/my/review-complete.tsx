import React from 'react';

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

  const { data: reviewsDatas } = useGetReviewsMine(value);

  return reviewsDatas && reviewsDatas.length > 0 ? (
    reviewsDatas.map((data: Reviews, index: number) => <ReviewCard key={index} data={data} />)
  ) : (
    <NotReview type="reviewComplete" />
  );
}
