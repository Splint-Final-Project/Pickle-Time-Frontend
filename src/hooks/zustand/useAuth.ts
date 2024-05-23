import { create } from 'zustand';
import { SignInFormValues, UserInfoType } from '../../apis/types/authTypes';

const useAuth = create<{
  getUser: () => UserInfoType | null;
  signIn: (arg0: SignInFormValues) => void;
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
      // const res = await logIn(data);
      // localStorage.setItem("user", JSON.stringify(res.user));
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('user', JSON.stringify({ email: data.email }));
      localStorage.setItem('token', 'randomToken');
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
