import { getReviewsAll, getReviewsMine, postReviews } from '@/apis/reviews';
import { useMutation, useQuery } from '@tanstack/react-query';

import { PostReviews, ReviewsParams } from '@/types/reviews';

export const useGetReviewsAll = (value: ReviewsParams) => {
  return useQuery({
    queryKey: ['reviewsAll', value],
    queryFn: () => getReviewsAll(value),
  });
};

export const useGetReviewsMine = (value: ReviewsParams) => {
  return useQuery({
    queryKey: ['reviewsMine', value],
    queryFn: () => getReviewsMine(value),
  });
};

export const usePostReviews = () => {
  return useMutation({
    mutationFn: (value: PostReviews) => postReviews(value),
  });
};
