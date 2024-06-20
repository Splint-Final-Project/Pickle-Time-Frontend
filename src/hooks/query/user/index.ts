import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userRequests } from '@/apis/user.api';
import { UpdateProfile } from '@/apis/types/user.type';

export const useUpdateProfileMutation = (profileData: UpdateProfile) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await userRequests.updateProfile(profileData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    onError: error => {
      console.error(error);
      toast.error('프로필 수정에 실패했습니다!🥲');
    },
  });
};
