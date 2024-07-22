import { getGatherings, postGatheringsJoin } from '@/apis/gatherings';
import { postGatherings } from '@/apis/gatherings';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { GetGatheringsQuery } from '@/types/gatherings';

// export const useGetGathering = (
//   pageParam: number = 0,
//   size: string = '5',
//   sortBy: string = 'date',
//   sortOrder: string = 'asc',
//   mainCategory: string = '활동',
//   subCategory: string = '러닝',
// ) => {
//   return useQuery({
//     queryKey: ['gatherings', pageParam, size, sortBy, sortOrder, mainCategory, subCategory],
//     queryFn: () => getGatherings(pageParam, size, sortBy, sortOrder, mainCategory, subCategory),
//   });
// };

// 이것들이 과연 훅인가? use가 들어갈만한 내용들인가?
export const useGetGatherings = (
  mainCategoryName: string,
  subCategoryName: string,
  sortBy: string,
  sortOrder: string,
) => {
  return useInfiniteQuery({
    queryKey: ['Gatherings'],
    queryFn: ({ pageParam }) => getGatherings(pageParam, mainCategoryName, subCategoryName),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 6 && lastPage.length !== 0) {
        console.log(pages.length);
        return pages.length;
      } else {
        return undefined;
      }
    },
    retry: 0,
  });
};

export const usePostGatheringsJoin = () => {
  return useMutation({
    mutationFn: ({ gatheringId, value }: { value: string; gatheringId: number }) =>
      postGatheringsJoin(gatheringId, value),
  });
};

export const usePostGatherings = () => {
  return useMutation({
    mutationFn: (value: FormData) => postGatherings(value),
  });
};
