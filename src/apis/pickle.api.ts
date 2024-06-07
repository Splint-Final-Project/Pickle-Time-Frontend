import client from '@/apis/axios';
import { API, API_PICKLE } from '@/constants/API';
import { Coordinates, CreatePickleData } from './types/pickles.type';

export const picklesRequests = Object.freeze({
  // 피클 전체 목록조회
  getWithPage: async () => {
    const { data } = await client.get(API.PICKLE);
    return data;
  },

  getPopular: async () => {
    const { data } = await client.get(API_PICKLE.POPULAR);
    return data;
  },
  getHotTime: async () => {
    const { data } = await client.get(API_PICKLE.HOT_TIME);
    return data;
  },
  // 가까운 피클
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

  // 피클 생성
  createPickle: async (pickleData: CreatePickleData) => {
    const { data } = await client.post(API_PICKLE.CREATE, pickleData);
    return data;
  },

  // 피클 상세조회
  getPickleDetail: (pickleId: string) => {
    return client.get(API_PICKLE.BY_ID(pickleId));
  },
});

const likePickle = (pickleId: string) => {
  return client.put(API_PICKLE.LIKE(pickleId));
};

const deletePickleLike = (pickleId: string) => {
  return client.delete(API_PICKLE.LIKE(pickleId));
};

export default { likePickle, deletePickleLike };
