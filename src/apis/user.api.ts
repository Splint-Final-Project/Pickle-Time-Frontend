import client from '@/apis/axios';
import { UpdateProfile } from '@/apis/types/user.type';
import { API_USER } from '@/constants/API';

export const userRequests = Object.freeze({
  // 프로필 이미지 수정(라이브러리)
  updateImgUrl: (imgFile: File) => {
    const formData = new FormData();
    formData.append('image', imgFile);

    return client.post(API_USER.PROFILE_IMG, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 프로필 이미지 생성(AI)
  createGeneratedImgUrl: async (imgUrl: string) => {
    return await client.post(API_USER.GENERATED_PROFILE_IMG, { imageUrl: imgUrl });
  },

  // 프로필 수정
  updateProfile: async (profileData: UpdateProfile) => {
    const { data } = await client.put(API_USER.PROFILE, profileData);
    return data;
  },
});
