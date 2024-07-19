import { getAccounts } from '@/apis/accounts';
import { useQuery } from '@tanstack/react-query';

import { getCookie } from 'cookies-next';

export const useGetAccounts = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => getAccounts(),
    enabled: !!getCookie('accessToken'),
  });
