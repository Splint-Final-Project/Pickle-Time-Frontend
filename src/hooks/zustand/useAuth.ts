import { create } from 'zustand';
import { SignInFormValues, UserInfoType } from '@/apis/types/auth.type';
import { authRequests } from '@/apis/auth.api';

const useAuth = create<{
  getUser: () => true | false;
  signIn: (arg0: SignInFormValues) => any;
  // oAuthSetToken: (token: string) => void;
  signOut: () => void;
}>()(() => ({
  getUser: () => {
    const item = localStorage.getItem('token');
    if (!item || item === 'undefined') {
      return false;
    }
    // const parsed = JSON.parse(item);
    return true;
  },

  signIn: async (data: SignInFormValues) => {
    try {
      const res = await authRequests.signIn(data);
      return res.user.status;
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
      const res = await authRequests.signOut();
      console.log(res);
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      // console.log('logout success');
      location.replace('/sign-in');
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useAuth;
