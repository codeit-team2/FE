import { getReviewsMine, postReviews, putReviews } from '@/apis/reviews';
import { useMutation, useQuery } from '@tanstack/react-query';

import { PostReviews, PutReviews, ReviewsParams } from '@/types/reviews';

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

export const usePutReviews = () => {
  return useMutation({
    mutationFn: (value: PutReviews) => putReviews(value),
  });
};
