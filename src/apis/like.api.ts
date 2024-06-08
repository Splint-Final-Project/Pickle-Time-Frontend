import client from '@/apis/axios';
import { API_LIKE } from '@/constants/API';

export const likeRequests = Object.freeze({
  pickles: async () => {
    const { data } = await client.get(API_LIKE.GET());
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
