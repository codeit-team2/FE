import { postGatherings } from '@/apis/gatherings';
import { useMutation } from '@tanstack/react-query';

export const usePostGatherings = () => {
  return useMutation({
    mutationFn: (value: FormData) => postGatherings(value),
  });
};
