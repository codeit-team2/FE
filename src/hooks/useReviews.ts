import {
  deleteReviews,
  getGatheringReview,
  getReviewsAll,
  getReviewsAllV2,
  getReviewsMine,
  postReviews,
  putReviews,
} from '@/apis/reviews';
import { UseMutationResult, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { PostReviews, PutReviews, ReviewsParams } from '@/types/reviews';

interface PostReviewsResponse {
  success: boolean;
}

interface UseReviewsArgs {
  onSuccess: (data: PostReviewsResponse) => void;
  onError: (error: unknown) => void;
}

export const useGetReviewsAll = (
  mainCategoryName: string,
  subCategoryName: string,
  size: number,
  sortBy: 'score',
  sortOrder: 'asc' | 'desc',
) => {
  return useInfiniteQuery({
    queryKey: ['reviewsAll', mainCategoryName, subCategoryName, size, sortBy, sortOrder],
    queryFn: ({ pageParam = 0 }) =>
      getReviewsAll(pageParam, mainCategoryName, subCategoryName, size, sortBy, sortOrder),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === size) {
        return pages.length;
      } else {
        return undefined;
      }
    },
    retry: 0,
    initialPageParam: 0,
  });
};

export const useGetReviewsAllV2 = (value: ReviewsParams) => {
  return useQuery({
    queryKey: ['reviewsAll', value],
    queryFn: () => getReviewsAllV2(value),
  });
};

export const useGetReviewsMine = (value: ReviewsParams) => {
  return useQuery({
    queryKey: ['reviewsMine', value],
    queryFn: () => getReviewsMine(value),
  });
};

export const useGetGatheringReview = (gatheringId: number) => {
  return useQuery({
    queryKey: ['gatheringReview', gatheringId],
    queryFn: () => getGatheringReview(gatheringId),
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

export const useDeleteReviews = ({
  onSuccess,
  onError,
}: UseReviewsArgs): UseMutationResult<PostReviewsResponse, unknown, number, unknown> => {
  return useMutation<PostReviewsResponse, unknown, number>({
    mutationFn: (reviewId: number) => deleteReviews(reviewId),
    onSuccess: onSuccess,
    onError: onError,
  });
};
