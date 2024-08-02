import {
  deleteGatherings,
  getDetailGatherings,
  getGatherings,
  getGatheringsJoined,
  getGatheringsMine,
  getGatheringsParticipant,
  postGatherings,
  postGatheringsJoin,
  postGatheringsLeave,
  putGatherings,
} from '@/apis/gatherings';
import { UseMutationResult, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

// postGatherings ??
import { GatheringsParams, PutGatherings } from '@/types/gatherings';

interface PostGatheringsResponse {
  success: boolean;
}

interface UseGatheringsArgs {
  onSuccess?: (data: PostGatheringsResponse) => void;
  onError?: (error: unknown) => void;
}

export const useGetGatherings = (
  mainCategoryName: string,
  subCategoryName: string,
  sortOrder: string,
  location: string | null,
  dateTime?: string | undefined,
) => {
  return useInfiniteQuery({
    queryKey: ['Gatherings', mainCategoryName, subCategoryName, sortOrder, location, dateTime],
    queryFn: ({ pageParam }) =>
      getGatherings(pageParam, mainCategoryName, subCategoryName, sortOrder, location, dateTime),
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

export const usePostGatherings = () => {
  return useMutation({
    mutationFn: (value: FormData) => postGatherings(value),
  });
};

export const usePutGatherings = () => {
  return useMutation({
    mutationFn: (value: PutGatherings) => putGatherings(value),
  });
};

export const useGatheringQuery = (gatheringId: number) => {
  return useQuery({
    queryKey: ['gatherings', gatheringId],
    queryFn: () => getDetailGatherings(gatheringId),
    enabled: !!gatheringId,
  });
};

export const usePostGatheringsJoin = ({
  onSuccess,
  onError,
}: UseGatheringsArgs): UseMutationResult<PostGatheringsResponse, unknown, number, unknown> => {
  return useMutation<PostGatheringsResponse, unknown, number>({
    mutationFn: (gatheringId: number) => postGatheringsJoin(gatheringId),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const usePostGatheringsLeave = ({
  onSuccess,
  onError,
}: UseGatheringsArgs): UseMutationResult<PostGatheringsResponse, unknown, number, unknown> => {
  return useMutation<PostGatheringsResponse, unknown, number>({
    mutationFn: (gatheringId: number) => postGatheringsLeave(gatheringId),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useDeleteGatherings = ({
  onSuccess,
  onError,
}: UseGatheringsArgs): UseMutationResult<PostGatheringsResponse, unknown, number, unknown> => {
  return useMutation<PostGatheringsResponse, unknown, number>({
    mutationFn: (gatheringId: number) => deleteGatherings(gatheringId),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useGetGatheringsMine = (
  size: number,
  sortBy: 'dateTime',
  sortOrder: 'asc' | 'desc',
) => {
  return useInfiniteQuery({
    queryKey: ['gatheringsMine', size, sortBy, sortOrder],
    queryFn: ({ pageParam }) => getGatheringsMine(pageParam, size, sortBy, sortOrder),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === size && lastPage.length !== 0) {
        return pages.length;
      } else {
        return undefined;
      }
    },
    retry: 0,
  });
};

export const useGetGatheringsJoined = (
  size: number,
  sortBy: 'dateTime',
  sortOrder: 'asc' | 'desc',
) => {
  return useInfiniteQuery({
    queryKey: ['gatheringsJoined', size, sortBy, sortOrder],
    queryFn: ({ pageParam }) => getGatheringsJoined(pageParam, size, sortBy, sortOrder),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === size && lastPage.length !== 0) {
        return pages.length;
      } else {
        return undefined;
      }
    },
    retry: 0,
  });
};

export const useGetGatheringsParticipant = (gatheringId: number, value: GatheringsParams) => {
  return useQuery({
    queryKey: ['gatheringsParticipant', gatheringId, value],
    queryFn: () => getGatheringsParticipant(gatheringId, value),
  });
};
