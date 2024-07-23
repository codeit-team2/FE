import {
  deleteGatherings,
  getGatherings,
  postGatherings,
  postGatheringsJoin,
  postGatheringsLeave,
} from '@/apis/gatherings';
import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query';

interface PostGatheringsResponse {
  success: boolean;
}

interface UseGatheringsArgs {
  onSuccess?: (data: PostGatheringsResponse) => void;
  onError?: (error: unknown) => void;
}

export const usePostGatherings = () => {
  return useMutation({
    mutationFn: (value: FormData) => postGatherings(value),
  });
};

export const useGatheringQuery = (gatheringId: number) => {
  return useQuery({
    queryKey: ['gatherings', gatheringId],
    queryFn: () => getGatherings(gatheringId),
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
