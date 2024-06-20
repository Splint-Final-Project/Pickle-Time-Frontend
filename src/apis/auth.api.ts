import client from '@/apis/axios';
import { SignInFormValues, SignUpFormValues, SignUpFormValues2, UpdateProfile } from '@/apis/types/auth.type';
import { API, API_AUTH } from '@/constants/API';
const TOKEN = '임시 토큰';

// auth : react-Query에서 호출 x, 대신 zustand에서 직접 호출합니다!
export const authRequests = Object.freeze({
  signIn: async (body: SignInFormValues) => {
    const { data } = await client.post(API_AUTH.LOGIN, body);
    return data;
  },

  // not used
  // getMe: async () => {
  //   const { data } = await client.get(API_AUTH.ME);
  //   return data;
  // },

  signUp: async (body: SignUpFormValues) => {
    console.log(body);
    const { data } = await client.post(API_AUTH.JOIN, body);
    return data;
  },

  signUp2: async (body: SignUpFormValues2) => {
    console.log(body);
    const { data } = await client.put(API_AUTH.JOIN2, body);
    return data;
  },

  signOut: async () => {
    const { data } = await client.delete(API_AUTH.LOGOUT, {});
    return data;
  },

  updateProfile: async (body: UpdateProfile) => {
    // const { data } = await client.put(API.AUTH, body);
    const data = {
      nickname: '임시네임',
      profilePic: 'ddddd',
      areaCodes: ['서울 중구', '서울 서대문구'],
    };
    return data;
  },
});
