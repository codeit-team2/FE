import React from 'react';

import ReviewCard from '@/components/My/ReviewCard';
import NotCard from '@/components/NotCard';

import { useGetReviewsMine } from '@/hooks/useReviews';

import { ReviewsParams } from '@/types/reviews';

export default function ReviewComplete() {
  // getReviewsMine api 호출
  const value: ReviewsParams = {
    page: 0,
    size: 5,
    sortBy: 'score',
    sortOrder: 'asc',
  };

  const { data } = useGetReviewsMine(value);

  return data ? <ReviewCard data={data} /> : <NotCard />;
}
