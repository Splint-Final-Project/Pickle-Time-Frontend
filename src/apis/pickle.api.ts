import client from '@/apis/axios';
import { API_PICKLE } from '@/constants/API';

export const picklesRequests = Object.freeze({
  getWithPage: async () => {
    const { data } = await client.get(API_PICKLE.GET_ALL);
    return data;
  }
});
