import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import pickleApi from '@/apis/pickle.api';

type HandleSuccessFunction = (data: any) => void;

export const usePickleLikeMutation = (handleSuccess: HandleSuccessFunction) => {
  return useMutation({
    mutationFn: async (pickleId: string) => {
      return pickleApi.likePickle(pickleId);
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
    mutationFn: (pickleId: string) => pickleApi.deletePickleLike(pickleId),
    onSuccess: handleSuccess,
  });
};
