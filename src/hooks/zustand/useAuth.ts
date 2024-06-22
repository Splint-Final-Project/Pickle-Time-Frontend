import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignInFormValues, SignUpFormValues, SignUpFormValues2 } from '@/apis/types/auth.type';
import { authRequests } from '@/apis/auth.api';
import { userRequests } from '@/apis/user.api';
import { UpdateProfile } from '@/apis/types/user.type';
import { showToast } from '@/components/common/Toast';
import { showErrorToast } from '@/components/common/Toast';
import toast from 'react-hot-toast';

interface State {
  user: any | null;
  signIn: (data: SignInFormValues) => any;
  setMe: (data: any) => any;
  signUp: (data: SignUpFormValues) => any;
  signUp2: (data: SignUpFormValues2) => any;
  signOut: () => any;
  updateProfile: (data: UpdateProfile) => any;
}

const useAuth = create(
  persist<State>(
    (set, get) => ({
      user: null,
      signIn: async (data: SignInFormValues) => {
        try {
          const res = await authRequests.signIn(data);
          set({ user: res.user });
          return res.user.status;
        } catch (err: any) {
          showErrorToast(err.response?.data.error || '로그인에 실패했습니다.');
          throw new Error();
        }
      },
      setMe: (data: any) => {
        set({ user: data });
      },

      signUp: async (data: SignUpFormValues) => {
        try {
          const res = await authRequests.signUp(data);
          set({ user: res.user });
        } catch (err: any) {
          showErrorToast(err.response?.data.error || '회원가입에 실패했습니다.');
          throw new Error();
        }
      },
      signUp2: async (data: SignUpFormValues2) => {
        try {
          const res = await authRequests.signUp2(data);
          set({ user: res.user });
        } catch (err: any) {
          showErrorToast(err.response?.data.error || '회원가입에 실패했습니다.');
          throw new Error();
        }
      },
      signOut: async () => {
        try {
          set({ user: null });
          const res = await authRequests.signOut();
        } catch (e) {
          console.log(e);
        } finally {
          location.replace('/sign-in');
        }
      },

      updateProfile: async (data: UpdateProfile) => {
        try {
          const currentUser = get().user;
          const { updates } = await userRequests.updateProfile(data);
          set({ user: { ...currentUser, ...updates } });
          showToast('프로필 수정이 완료되었어요!');
        } catch (e) {
          showErrorToast('프로필 수정에 실패했어요.');
          throw new Error();
        }
      },
    }),
    {
      name: 'auth-storage', // Specify a name for the storage
    },
  ),
);

export default useAuth;
