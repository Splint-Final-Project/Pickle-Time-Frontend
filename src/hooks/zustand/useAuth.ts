import { create } from 'zustand';
import { SignInFormValues, UserInfoType } from '@/apis/types/authTypes';
import { authRequests } from '@/apis/index';

const useAuth = create<{
  getUser: () => UserInfoType | null;
  signIn: (arg0: SignInFormValues) => void;
  oAuthSetToken: (token: string) => void;
  signOut: () => void;
}>()(() => ({
  getUser: () => {
    const item = localStorage.getItem('user');
    if (!item || item === 'undefined') {
      return null;
    }
    const parsed = JSON.parse(item);
    return parsed;
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
