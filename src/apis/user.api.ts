import { API_USER } from '@/constants/API';
import client from './axios';
import { UpdateProfile } from '@/apis/types/user.type';

export const userRequests = Object.freeze({
  updateImgUrl: (imgFile: File) => {
    const formData = new FormData();
    formData.append('image', imgFile);

    return client.post(API_USER.PROFILE_IMG, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  createGeneratedImgUrl: async (imgUrl: string) => {
    return await client.post(API_USER.GENERATED_PROFILE_IMG, { imageUrl: imgUrl });
  },

  updateProfile: async (profileData: UpdateProfile) => {
    const { data } = await client.put(API_USER.PROFILE, profileData);
    return data;
  },
});
