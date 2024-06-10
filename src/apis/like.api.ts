import client from '@/apis/axios';
import { API_LIKE } from '@/constants/API';

export const likeRequests = Object.freeze({
  getPickles: async () => {
    const { data } = await client.get(API_LIKE.GETALL());
    return data;
  },

  getPickle: async (pickleId: string) => {
    const { data } = await client.get(API_LIKE.GET(pickleId));
    return data;
  },

  likePickle: async (pickleId: string) => {
    const { data } = await client.post(API_LIKE.CREATE(pickleId));
    return data;
  },

  deletePickleLike: async (pickleId: string) => {
    const { data } = await client.delete(API_LIKE.DELETE(pickleId));
    return data;
  },
});
