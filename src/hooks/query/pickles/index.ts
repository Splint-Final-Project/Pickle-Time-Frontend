import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { picklesRequests } from '@/apis/pickle.api';
import { Coordinates, CreatePickleData } from '@/apis/types/pickles.type';

export const useGetInfinitePickles = () => {
  return useInfiniteQuery({
    queryKey: ['pickles'],

    initialPageParam: 0,
    queryFn: async ({ pageParam }) => await picklesRequests.getWithPage(),

    getNextPageParam: lastPage => {
      return lastPage.cursorId;
    },

    select: data => {
      return data;
    },
  });
};

export const useGetNearbyPickles = (location: Coordinates | null) => {
  return useQuery({
    queryKey: ['pickles', 'nearby'],

    queryFn: async () => await picklesRequests.getNearby(location),
  });
};

export const useCreatePickleMutation = (pickleData: CreatePickleData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await picklesRequests.createPickle(pickleData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pickles'] }),
    onError: error => {
      console.error(error);
      toast.error('피클 생성에 실패했습니다.');
    },
  });
};

export const useGetPickelDetail = (pickleId: string) => {
  return useQuery({
    queryKey: ['pickles', pickleId],
    queryFn: async () => {
      return await picklesRequests.getPickleDetail(pickleId);
    },
  });
};
