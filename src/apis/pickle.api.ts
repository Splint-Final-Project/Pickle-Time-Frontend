import client from '@/apis/axios';
import { API_PICKLE } from '@/constants/API';
import { Coordinates } from './types/pickles.type';

export const picklesRequests = Object.freeze({
  getWithPage: async () => {
    const { data } = await client.get(API_PICKLE.GET_ALL);
    return data;
  },

  getNearby: async (location: Coordinates | null) => {
    if (location === null) return null;
    const { data } = await client.get(API_PICKLE.NEARBY, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    });
    return data;
  },
});
