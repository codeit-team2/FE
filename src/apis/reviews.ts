import { instance } from '@/lib/axios';

import { PostReviews, ReviewsParams } from '@/types/reviews';

export const getReviewsAll = async (value: ReviewsParams) => {
  const { mainCategoryName, subCategoryName, page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/reviews?mainCategoryName=${mainCategoryName}&subCategoryName=${subCategoryName}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return res.data;
};

export const getReviewsMine = async (value: ReviewsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/reviews/mine?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return res.data;
};

export const postReviews = async (value: PostReviews) => {
  const res = await instance.post(`/reviews`, value);
  return res;
};
