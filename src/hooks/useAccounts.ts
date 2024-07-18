import { getAccounts } from '@/apis/accounts';
import { useMutation } from '@tanstack/react-query';

export const useGetAccounts = () =>
  useMutation({
    mutationFn: () => getAccounts(),
  });
