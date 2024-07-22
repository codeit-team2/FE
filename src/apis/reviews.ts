import { instance } from '@/lib/axios';

import { ReviewsParams } from '@/types/reviews';

export const getReviewsMine = async (value: ReviewsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/reviews/mine?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return res.data;
};
