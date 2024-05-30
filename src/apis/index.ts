// 추후 폴더 격리를 통해, 리팩토링도 가능합니다.
import client from './axios';
import { SignInFormValues, SignUpFormValues } from './types/authTypes';

// const ERROR_MESSAGE = '에러 발생:';

const TOKEN = '임시 토큰';

// auth : react-Query에서 호출 x, 대신 zustand에서 직접 호출합니다!
export const authRequests = Object.freeze({
  signIn: async (body: SignInFormValues) => {
    console.log(body);
    const { data } = await client.post('user/login', body);
    return data;
  },

  signup: async (body: SignUpFormValues) => {
    console.log(body);
    const { data } = await client.post('user/join', body);
    return data;
  },

  // Logout : async () =>  {
  //   const { data } = await client.post('logout', {
  //   });
  //   return data;
  // },
});

// pickles
export const picklesRequests = Object.freeze({});
