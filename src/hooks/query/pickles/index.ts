import { useQuery, useInfiniteQuery, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { picklesRequests } from '@/apis/pickle.api';
import { Coordinates, CreatePickleData } from '@/apis/types/pickles.type';
import toast from 'react-hot-toast';

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

    refetchOnWindowFocus: true, // 포커스 될 때 재요청 
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 300000,
  });
};

export const useGetNearbyPickles = (location: Coordinates | null) => {
  return useQuery({
    queryKey: ['pickles', 'nearby'],

    queryFn: async () => await picklesRequests.getNearby(location),

    refetchOnWindowFocus: true, // 포커스 될 때 재요청 
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 300000,
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

export const useGetSpecialPickles = (type: 'hotTime' | 'popular') => {
  if (type === 'hotTime') {
    return useSuspenseQuery({
      queryKey: ['pickles', 'hotTime'],
      queryFn: async () => await picklesRequests.getHotTime(),
      select: data => data.data,

      refetchOnWindowFocus: true, // 포커스 될 때 재요청 
      refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
      refetchInterval: 300000,
    });
  } else {
    return useSuspenseQuery({
      queryKey: ['pickles', 'popular'],
      queryFn: async () => await picklesRequests.getPopular(),
      select: data => data.data,
    });
  }
};

export const useGetPickelDetail = (pickleId: string) => {
  return useQuery({
    queryKey: ['pickles', pickleId],
    queryFn: async () => {
      return await picklesRequests.getPickleDetail(pickleId);
    },
  });
};
