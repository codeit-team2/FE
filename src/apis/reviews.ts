import { instance } from '@/lib/axios';

import { PostReviews, ReviewsParams } from '@/types/reviews';

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
