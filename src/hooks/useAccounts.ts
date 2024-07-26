import { deleteAccounts, getAccounts, postAccounts } from '@/apis/accounts';
import { useMutation, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

import { PostAccounts } from '@/types/accounts';
import { OnSuccessAndonErrorType } from '@/types/auths';

export const useGetAccounts = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => getAccounts(),
    enabled: !!getCookie('accessToken'),
  });

export const usePostAccounts = ({ onSuccess, onError }: OnSuccessAndonErrorType) => {
  return useMutation<PostAccounts, AxiosError, FormData>({
    mutationFn: (value: PostAccounts) => postAccounts(value),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useDeleteAccounts = ({ onSuccess, onError }: OnSuccessAndonErrorType) =>
  useMutation({
    mutationFn: () => deleteAccounts(),
    onSuccess: onSuccess,
    onError: onError,
  });
