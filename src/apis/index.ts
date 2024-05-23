// 추후 폴더 격리를 통해, 리팩토링도 가능합니다.
import axios from './axios';

// const ERROR_MESSAGE = '에러 발생:';

const TOKEN = '임시 토큰';

// auth
export const authRequests = Object.freeze({
  signIn : async () =>  {
    const { data } = await axios.post('login', {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return data;
  },

  signup : async () =>  {
    const { data } = await axios.post('signup', {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return data;
  },

  Logout : async () =>  {
    const { data } = await axios.post('logout', {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return data;
  },
});

// pickles
export const picklesRequests = Object.freeze({

});

