import { getGatherings, postGatheringsJoin } from '@/apis/gatherings';
import { postGatherings } from '@/apis/gatherings';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

// 이것들이 과연 훅인가? use가 들어갈만한 내용들인가?
export const useGetGatherings = (
  mainCategoryName: string,
  subCategoryName: string,
  sortBy: string,
  sortOrder: string,
  location: string | null,
) => {
  return useInfiniteQuery({
    queryKey: ['Gatherings', mainCategoryName, subCategoryName, sortBy, sortOrder, location],
    queryFn: ({ pageParam }) =>
      getGatherings(pageParam, mainCategoryName, subCategoryName, sortBy, sortOrder, location),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 5 && lastPage.length !== 0) {
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
