import client from '@/apis/axios';
import { API, API_PICKLE } from '@/constants/API';
import { Coordinates, CreatePickleData } from './types/pickles.type';

export const picklesRequests = Object.freeze({
  getWithPage: async () => {
    const { data } = await client.get(API.PICKLE);
    return data;
  },

  getNearby: async (location: Coordinates | null) => {
    if (location === null) return null;
    const { data } = await client.get(API_PICKLE.NEARBY, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
    return data;
  },

  createPickle: async (pickleData: CreatePickleData) => {
    const { data } = await client.post(API_PICKLE.CREATE, pickleData);
    return data;
  },
});

const likePickle = (pickleId: string) => {
  return client.put(API_PICKLE.LIKE(pickleId));
};

const deletePickleLike = (pickleId: string) => {
  return client.delete(API_PICKLE.LIKE(pickleId));
};

export default { likePickle, deletePickleLike };
