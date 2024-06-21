import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignInFormValues, SignUpFormValues, SignUpFormValues2 } from '@/apis/types/auth.type';
import { authRequests } from '@/apis/auth.api';
import { userRequests } from '@/apis/user.api';
import { UpdateProfile } from '@/apis/types/user.type';

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
          console.log(res.user);
          return res.user.status;
        } catch (err) {
          console.log(err);
          throw new Error();
        }
      },
      setMe: (data: any) => {
        console.log(data);
        set({ user: data });
      },

      signUp: async (data: SignUpFormValues) => {
        try {
          const res = await authRequests.signUp(data);
          set({ user: res.user });
          console.log(res.user);
        } catch (err) {
          console.log(err);
          throw new Error();
        }
      },
      signUp2: async (data: SignUpFormValues2) => {
        try {
          const res = await authRequests.signUp2(data);
          set({ user: res.user });
          console.log(res.user);
        } catch (err) {
          console.log(err);
          throw new Error();
        }
      },
      signOut: async () => {
        try {
          set({ user: null });
          const res = await authRequests.signOut();
          console.log(res);
        } catch (e) {
          console.log(e);
        } finally {
          location.replace('/sign-in');
        }
      },

      updateProfile: async (data: UpdateProfile) => {
        try {
          const currentUser = get().user;
          const res = await userRequests.updateProfile(data);
          set({ user: { ...currentUser, ...data } });
          console.log('업데이트 프로필', res.user);
        } catch (e) {
          console.log(e);
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
