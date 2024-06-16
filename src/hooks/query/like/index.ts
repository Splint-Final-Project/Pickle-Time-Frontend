import { toast } from 'react-hot-toast';
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likeRequests } from '@/apis/like.api';
import { picklesRequests } from '@/apis/pickle.api';

type HandleSuccessFunction = (data: any) => void;

export const useGetLikePickles = () => {
  return useInfiniteQuery({
    queryKey: ['pickles', 'like'],

    initialPageParam: 0,
    queryFn: async ({ pageParam }) => await likeRequests.getPickles(),

    getNextPageParam: lastPage => {
      return lastPage.cursorId;
    },

    select: data => {
      return data;
    },

    refetchOnWindowFocus: true, // 포커스 될 때 재요청 
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 300000,
  })
};

export const useGetLikePickle = (pickleId: string) => {
  return useQuery({
    queryKey: ['pickles', 'like', pickleId],
    queryFn: async () => await likeRequests.getPickle(pickleId),
  });
}

export const useGetLikeCount = (pickleId: string) => {
  return useQuery({
    queryKey: ['pickles', 'like', pickleId, 'likeCount'],
    queryFn: async () => await picklesRequests.getLikeCount(pickleId),
  });
}

export const usePickleLikeMutation = (pickleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return likeRequests.likePickle(pickleId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pickles', 'like', pickleId] }),
    onError: error => {
      console.log(error);
      toast.error('피클을 찜하지 못했습니다!');
    },
  });
};

export const useDeletePickleLikeMutation = (pickleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => likeRequests.deletePickleLike(pickleId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pickles', 'like', pickleId] }),
  });
};
