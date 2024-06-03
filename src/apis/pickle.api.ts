import client from '@/apis/axios';
import { API_PICKLE } from '@/constants/API';

const likePickle = (pickleId: string) => {
  return client.put(API_PICKLE.LIKE(pickleId));
};

const deletePickleLike = (pickleId: string) => {
  return client.delete(API_PICKLE.LIKE(pickleId));
};

export default { likePickle, deletePickleLike };
