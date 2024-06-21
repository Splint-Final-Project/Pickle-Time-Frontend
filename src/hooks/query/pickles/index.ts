import { useQuery, useInfiniteQuery, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { picklesRequests } from '@/apis/pickle.api';
import { Coordinates, CreatePickleData, CreateReviewData } from '@/apis/types/pickles.type';
import toast from 'react-hot-toast';
import { useDebounce } from '@uidotdev/usehooks';

interface PICKLE_DATA {}

// Domain: MOST_IMPORTANT
export const useCreatePickleMutation = (pickleData: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await picklesRequests.createPickle(pickleData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pickles'] }),
    onError: error => {
      console.error(error);
      toast.error('피클 생성에 실패했습니다.');
    },
  });
};

export const useEditPickleMutation = (pickleId: string, pickleData: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await picklesRequests.editPickle(pickleId, pickleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickles'] });
    },
    onError: error => {
      throw new Error('피클 수정에 실패했습니다.');
    },
  });
};

export const useGetInfinitePickles = () => {
  return useQuery({
    queryKey: ['pickles'],
    queryFn: async () => await picklesRequests.get(),

    refetchOnWindowFocus: true, // 포커스 될 때 재요청
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 300000,
  });
};

export const useGetNearbyPickles = (location: Coordinates | null, level: number) => {
  const locationquery = useDebounce(JSON.stringify([location, level]), 210);
  return useQuery({
    queryKey: ['pickles', 'nearby', JSON.parse(locationquery)],

    queryFn: async () => await picklesRequests.getNearby(location, level),

    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true, // 포커스 될 때 재요청
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 300000,
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
      refetchInterval: 5 * 60 * 1000,
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
      const { data } = await picklesRequests.getPickleDetail(pickleId);
      return data;
    },
  });
};

export const useMyReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => await picklesRequests.getMyReviews(),
  });
};

export const useCreateReviewMutation = (pickleId: string, callback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData: CreateReviewData) => {
      console.log('리뷰데이터', reviewData);
      return picklesRequests.createReview(pickleId, reviewData);
    },
    onSuccess: () => {
      toast('리뷰 작성 완료! 500P가 지급됐습니다.');
      callback();
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error: any) => {
      console.error(error);
      callback();
      toast.error(error.response.data.message);
    },
  });
};

export const useDeleteReviewMutation = (pickleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return picklesRequests.deleteReview(pickleId);
    },
    onSuccess: () => {
      toast('리뷰 삭제가 완료되었어요!');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: error => {
      console.error(error);
      toast.error('리뷰 삭제에 실패했습니다.');
    },
  });
};

export const useGetPendingPickles = () => {
  return useQuery({
    queryKey: ['pickles', 'pending'],
    queryFn: async () => await picklesRequests.getPendingPickles(),

    refetchOnWindowFocus: true, // 포커스 될 때 재요청
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useGetProceedingPickles = () => {
  return useQuery({
    queryKey: ['pickles', 'proceeding'],
    queryFn: async () => await picklesRequests.getProceedingPickles(),

    refetchOnWindowFocus: true, // 포커스 될 때 재요청
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useGetFinishPickles = () => {
  return useQuery({
    queryKey: ['pickles', 'finish'],
    queryFn: async () => await picklesRequests.getFinishPickles(),

    refetchOnWindowFocus: true, // 포커스 될 때 재요청
    refetchIntervalInBackground: true, // 백그라운드 일 때 재요청 o
    refetchInterval: 5 * 60 * 1000,
  });
};
