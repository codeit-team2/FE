import { getGatheringsJoined, getGatheringsMine, postGatherings } from '@/apis/gatherings';
import { useMutation, useQuery } from '@tanstack/react-query';

import { GatheringsParams } from '@/types/gatherings';

export const usePostGatherings = () => {
  return useMutation({
    mutationFn: (value: FormData) => postGatherings(value),
  });
};

export const useGetGatheringsMine = (value: GatheringsParams) => {
  return useQuery({
    queryKey: ['gatheringsMine', value],
    queryFn: () => getGatheringsMine(value),
  });
};

export const useGetGatheringsJoined = (value: GatheringsParams) => {
  return useQuery({
    queryKey: ['gatheringsJoined', value],
    queryFn: () => getGatheringsJoined(value),
  });
};
