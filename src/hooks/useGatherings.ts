import { getGatherings } from '@/apis/gatherings';
import { useMutation } from '@tanstack/react-query';

export const useGetGathering = () => {
  useMutation({
    mutationFn: (page?: string, size?: string, sortBy?: string, sortOrder?: string) =>
      getGatherings(page, size, sortBy, sortOrder),
  });
};
