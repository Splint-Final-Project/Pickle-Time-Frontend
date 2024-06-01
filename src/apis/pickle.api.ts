import client from '@/apis/axios';
import { API_PICKLE } from '@/constants/API';
import { Coordinates } from './types/pickles.type';

export const picklesRequests = Object.freeze({
  getWithPage: async () => {
    const { data } = await client.get(API_PICKLE.GET_ALL);
    return data;
  },

  getNearby: async ({latitude, longitude}: Coordinates) => {
    const { data } = await client.get(API_PICKLE.NEARBY, {
      params: {
        latitude,
        longitude
      }
    });
    return data;
  }
});
