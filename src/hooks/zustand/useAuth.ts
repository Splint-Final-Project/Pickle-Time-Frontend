import { create } from 'zustand';
import { SignInFormValues, SignUpFormValues, SignUpFormValues2, UserInfoType } from '@/apis/types/auth.type';
import { authRequests } from '@/apis/auth.api';

const useAuth = create<any>()(set => ({
  // user: any;
  // signIn: (arg0: SignInFormValues) => any;
  // // oAuthSetToken: (token: string) => void;
  // signOut: () => void;
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
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },

  signUp2: async (data: SignUpFormValues2) => {
    try {
      const res = await authRequests.signUp2(data);
      set({ user: res.user });
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },
  // oAuthSetToken: (token: string) => {
  //   if (token) {
  //     localStorage.setItem('token', token);
  //   }
  // },
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
}));

export default useAuth;
