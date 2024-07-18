import { getGatherings } from '@/apis/gatherings';
import { useQuery } from '@tanstack/react-query';

export const useGetGathering = (
  page: string = '0',
  size: string = '5',
  sortBy: string = 'date',
  sortOrder: string = 'asc',
) => {
  return useQuery({
    queryKey: ['gatherings', page, size, sortBy, sortOrder],
    queryFn: () => getGatherings(page, size, sortBy, sortOrder),
  });
};

//   return useQuery({
//     ['gatherings', page, size, sortBy, sortOrder], // 쿼리 키
//     () => getGatherings(page, size, sortBy, sortOrder), // 데이터 페칭 함수
//   });
// };
