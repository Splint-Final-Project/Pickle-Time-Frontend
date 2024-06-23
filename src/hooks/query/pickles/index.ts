import { useEffect } from "react";
import { useQuery, useInfiniteQuery, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { picklesRequests } from '@/apis/pickle.api';
import { Coordinates, CreatePickleData, CreateReviewData, SortByOptions } from '@/apis/types/pickles.type';
import { useDebounce } from '@uidotdev/usehooks';
import { showErrorToast, showToast } from '@/components/common/Toast';
import toast from 'react-hot-toast';

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
      showErrorToast('피클 생성에 실패했습니다.');
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
    onError: () => {
      showErrorToast('피클 수정에 실패했습니다.');
    },
  });
};

export const useGetInfinitePickles = (sortBy: SortByOptions['option']) => {
  return useQuery({
    queryKey: ['pickles', sortBy],
    queryFn: async () => await picklesRequests.get(sortBy),

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

export const useGetSpecialPickles = (type: 'hotTime' | 'popular', category: string) => {
  return useSuspenseQuery({
    queryKey: ['pickles', type, category],
    queryFn: async () => {
      if (type === 'hotTime') {
        return await picklesRequests.getHotTime(category);
      } else {
        return await picklesRequests.getPopular(category);
      }
    },
    select: data => data.data,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useGetPickleDetail = (pickleId: string) => {
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
      return await picklesRequests.createReview(pickleId, reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['pickles', 'finish'] });
      toast.success('리뷰 작성 완료! 500P가 지급됐습니다.');
      callback();
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
      showToast('리뷰 삭제가 완료되었어요!');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: error => {
      console.error(error);
      showErrorToast('리뷰 삭제에 실패했어요.');
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

// viewCount에 따라, 홈 부분의 데이터가 변경될 수 있으니, revalidate
const usePickleViewCountUp = (pickleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return picklesRequests.viewCountUp(pickleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickles'] });
    },
    onError: error => {
      console.error(error);
      showErrorToast('방문 횟수가 증가하지 않았어요.');
    },
  });
}

export const useViewCountLimit = (pickleId: string) => {
  const { mutate } = usePickleViewCountUp(pickleId)
  const visitKey = `lastVisit-${pickleId}`;
  const visitThreshold = 60000; // 60초 (1분)

  useEffect(() => {
    const lastVisit: string | null = localStorage.getItem(visitKey);
    const now = Date.now();

    if (!lastVisit || now - parseInt(lastVisit) > visitThreshold) {
      try { 
        mutate();
        localStorage.setItem(visitKey, now.toString());
      } catch (error) {
        console.error(error);
      }
    }
  }, []); // 빈 배열로 두어 컴포넌트가 마운트될 때 한 번만 실행
};

export default useViewCountLimit;