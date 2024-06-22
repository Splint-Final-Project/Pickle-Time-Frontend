import { useNavigate } from 'react-router-dom';
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showErrorToast } from '@/components/common/Toast';
import { likeRequests } from '@/apis/like.api';
import { picklesRequests } from '@/apis/pickle.api';
import useAuth from '@/hooks/zustand/useAuth';

type HandleSuccessFunction = (data: any) => void;

// export const useMyFavoritePickles = () => {
//   return useQuery({
//     queryKey: ['pickles', 'myFavorites'],
//     queryFn: async () => await likeRequests.getMyFavorites(),
//   });
// };

// 내가 찜한 피클들의 id만 가져오기
export const useMyFavoritePickleIds = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['pickles', 'myFavorites', 'ids'],
    queryFn: async () => await likeRequests.getMyFavoriteIds(),
    enabled: !!user,
  });
};

// 내가 찜한 피클들을 가져오기
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
  });
};

// Legacy code
// export const useGetLikePickle = (pickleId: string) => {
//   return useQuery({
//     queryKey: ['pickles', 'like', pickleId],
//     queryFn: async () => await likeRequests.getPickle(pickleId),
//   });
// };

// 피클의 찜한 개수와 내가 찜했는지를 가져오기 (찜 단건조회)
export const useGetLikeCount = (pickleId: string) => {
  return useQuery({
    queryKey: ['pickles', 'like', pickleId],
    queryFn: async () => await picklesRequests.getLikeCount(pickleId),
  });
};

//피클 찜하기
export const usePickleLikeMutation = (pickleId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        return navigate('/sign-in');
      }
      return likeRequests.likePickle(pickleId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['pickles', 'like', pickleId] });
      await queryClient.cancelQueries({ queryKey: ['pickles', 'myFavorites', 'ids'] });
      let previousData: any = queryClient.getQueryData(['pickles', 'like', pickleId]);
      await queryClient.setQueryData(['pickles', 'like', pickleId], {
        data: previousData?.data ? { ...previousData.data, isClicked: false } : { isClicked: false },
      });
      previousData = queryClient.getQueryData(['pickles', 'myFavorites', 'ids']) || { data: [] };
      await queryClient.setQueryData(['pickles', 'myFavorites', 'ids'], { data: [...previousData.data, pickleId] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickles', 'like', pickleId] });
      queryClient.invalidateQueries({ queryKey: ['pickles', 'myFavorites'] });
      queryClient.invalidateQueries({ queryKey: ['pickles', 'myFavorites', 'ids'] });
    },
    onError: error => {
      console.log(error);
      showErrorToast('피클을 찜하지 못했어요.');
    },
  });
};

//피클 찜 취소하기
export const useDeletePickleLikeMutation = (pickleId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        return navigate('/sign-in');
      }
      return likeRequests.deletePickleLike(pickleId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['pickles', 'like', pickleId] });
      await queryClient.cancelQueries({ queryKey: ['pickles', 'myFavorites', 'ids'] });
      let previousData: any = queryClient.getQueryData(['pickles', 'like', pickleId]);
      await queryClient.setQueryData(['pickles', 'like', pickleId], {
        data: { ...previousData.data, isClicked: false },
      });
      previousData = queryClient.getQueryData(['pickles', 'myFavorites', 'ids']) || { data: [] };
      console.log(previousData);
      await queryClient.setQueryData(['pickles', 'myFavorites', 'ids'], {
        data: previousData.data?.filter((id: any) => id !== pickleId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickles', 'like', pickleId] });
      queryClient.invalidateQueries({ queryKey: ['pickles', 'myFavorites'] });
      queryClient.invalidateQueries({ queryKey: ['pickles', 'myFavorites', 'ids'] });
    },
  });
};
