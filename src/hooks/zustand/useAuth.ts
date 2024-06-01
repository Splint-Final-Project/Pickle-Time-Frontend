import { create } from 'zustand';
import { SignInFormValues, UserInfoType } from '@/apis/types/auth.type';
import { authRequests } from '@/apis/auth.api';

const useAuth = create<{
  getUser: () => true | false;
  signIn: (arg0: SignInFormValues) => void;
  oAuthSetToken: (token: string) => void;
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
      console.log(data);

      const res = await authRequests.signIn(data);
      localStorage.setItem('token', res.response.token);
    } catch (err) {
      throw new Error();
    }
  },
  oAuthSetToken: (token: string) => {
    if (token) {
      localStorage.setItem('token', token);
    }
  },
  signOut: () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      console.log('logout success');
      location.replace('/sign-in');
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useAuth;
