import { getReviewsMine } from '@/apis/reviews';
import { useQuery } from '@tanstack/react-query';

import { ReviewsParams } from '@/types/reviews';

export const useGetReviewsMine = (value: ReviewsParams) => {
  return useQuery({
    queryKey: ['reviewsMine', value],
    queryFn: () => getReviewsMine(value),
  });
};
