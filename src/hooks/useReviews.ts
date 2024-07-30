import {
  deleteReviews,
  getReviewsAll,
  getReviewsMine,
  postReviews,
  putReviews,
} from '@/apis/reviews';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { DeleteReviews, PostReviews, PutReviews, ReviewsParams } from '@/types/reviews';

export const useGetReviewsAll = (
  mainCategoryName: string,
  subCategoryName: string,
  size: number,
  sortBy: 'joinedAt',
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
