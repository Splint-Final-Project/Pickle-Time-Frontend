import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignInFormValues, SignUpFormValues, SignUpFormValues2, UserInfoType } from '@/apis/types/auth.type';
import { authRequests } from '@/apis/auth.api';

interface State {
  user: any | null;
  signIn: (data: SignInFormValues) => any;
  signUp: (data: SignUpFormValues) => any;
  signUp2: (data: SignUpFormValues2) => any;
  signOut: () => any;
}

const useAuth = create(
  persist<State>(
    set => ({
      user: null,
      signIn: async (data: SignInFormValues) => {
        try {
          const res = await authRequests.signIn(data);
          set({ user: res.user });
          return res.user.status;
        } catch (err) {
          console.log(err);
          throw new Error();
        }
      },
      signUp: async (data: SignUpFormValues) => {
        try {
          const res = await authRequests.signUp(data);
          set({ user: res.user });
          console.log(res);
        } catch (err) {
          console.log(err);
          throw new Error();
        }
      },
      signUp2: async (data: SignUpFormValues2) => {
        try {
          const res = await authRequests.signUp2(data);
          set({ user: res.user });
          console.log(res);
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
    }),
    {
      name: 'auth-storage', // Specify a name for the storage
    },
  ),
);

export default useAuth;
