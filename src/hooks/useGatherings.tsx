import { getGatheringsMine, postGatherings } from '@/apis/gatherings';
import { useMutation, useQuery } from '@tanstack/react-query';

import { GatheringsMine } from '@/types/gatherings';

export const usePostGatherings = () => {
  return useMutation({
    mutationFn: (value: FormData) => postGatherings(value),
  });
};

export const useGetGatheringsMine = (value: GatheringsMine) => {
  return useQuery({
    queryKey: ['gatheringsMine', value],
    queryFn: () => getGatheringsMine(value),
  });
};
