import {
  deleteReviews,
  getReviewsAll,
  getReviewsMine,
  postReviews,
  putReviews,
} from '@/apis/reviews';
import { useMutation, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { DeleteReviews, PostReviews, PutReviews, ReviewsParams } from '@/types/reviews';

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
  return useMutation<PostReviews, AxiosError, PostReviews>({
    mutationFn: (value: PostReviews) => postReviews(value),
  });
};

export const usePutReviews = () => {
  return useMutation<PutReviews, AxiosError, PutReviews>({
    mutationFn: (value: PutReviews) => putReviews(value),
  });
};

export const useDeleteReviews = () => {
  return useMutation({
    mutationFn: (value: DeleteReviews) => deleteReviews(value),
  });
};
