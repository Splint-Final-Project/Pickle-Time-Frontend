import { create } from 'zustand';
import { SignInFormValues, SignUpFormValues, SignUpFormValues2, UserInfoType } from '@/apis/types/auth.type';
import { authRequests } from '@/apis/auth.api';

const useAuth = create<any>()(set => ({
  // user: any;
  // signIn: (arg0: SignInFormValues) => any;
  // // oAuthSetToken: (token: string) => void;
  // signOut: () => void;

  getMe: () => {
    const item = localStorage.getItem('me');
    if (!item || item === 'undefined') {
      return null;
    }
    const parsed = JSON.parse(item);
    return parsed;
  },

  setMe: (data: any) => {
    localStorage.setItem('me', JSON.stringify(data));
  },

  signIn: async (data: SignInFormValues) => {
    try {
      const res = await authRequests.signIn(data);
      localStorage.setItem('me', JSON.stringify(res.user));
      return res.user.status;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },

  signUp: async (data: SignUpFormValues) => {
    try {
      const res = await authRequests.signUp(data);
      console.log(res);
      localStorage.setItem('me', JSON.stringify(res.user));
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  },

  signUp2: async (data: SignUpFormValues2) => {
    try {
      const res = await authRequests.signUp2(data);
      console.log(res);
      localStorage.setItem('me', JSON.stringify(res.user));
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
      localStorage.removeItem('me');
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
