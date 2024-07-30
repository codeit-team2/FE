import { deleteAccounts, getAccounts, postAccounts } from '@/apis/accounts';
import { useMutation, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

import { PostAccounts } from '@/types/accounts';

export const useGetAccounts = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => getAccounts(),
    enabled: !!getCookie('accessToken'),
  });

export const usePostAccounts = () => {
  return useMutation<PostAccounts, AxiosError, any>({
    mutationFn: (value: PostAccounts) => postAccounts(value),
  });
};

export const useDeleteAccounts = () =>
  useMutation<string, AxiosError, null>({
    mutationFn: () => deleteAccounts(),
  });
