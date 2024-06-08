import { toast } from 'react-hot-toast';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { likeRequests } from '@/apis/like.api';

type HandleSuccessFunction = (data: any) => void;

export const useGetLikePickles = () => {
  return useInfiniteQuery({
    queryKey: ['pickles', 'like'],

    initialPageParam: 0,
    queryFn: async ({ pageParam }) => await likeRequests.pickles(),

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
}

export const usePickleLikeMutation = (handleSuccess: HandleSuccessFunction) => {
  return useMutation({
    mutationFn: async (pickleId: string) => {
      return likeRequests.likePickle(pickleId);
    },
    onSuccess: handleSuccess,
    onError: error => {
      console.log(error);
      toast.error('피클을 찜하지 못했습니다!');
    },
  });
};

export const useDeletePickleLikeMutation = (handleSuccess: HandleSuccessFunction) => {
  return useMutation({
    mutationFn: (pickleId: string) => likeRequests.deletePickleLike(pickleId),
    onSuccess: handleSuccess,
  });
};
