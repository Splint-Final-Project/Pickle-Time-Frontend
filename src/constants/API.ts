export const API = Object.freeze({
  AUTH: '/user',
  PICKLE: '/pickle',
  MESSAGES: '/messages',
  CONVERSATIONS: '/conversations',
});

export const API_AUTH = Object.freeze({
  LOGIN: `${API.AUTH}/login`,
  JOIN: `${API.AUTH}/join`,
  BY_ID: (userId: number) => `${API.AUTH}/${userId}`,
});

export const API_PICKLE = Object.freeze({
  CREATE: `${API.PICKLE}/create`,
  BY_ID: (pickleId: number) => `${API.PICKLE}/${pickleId}`,
  LIKE: (pickleId: number) => `${API.PICKLE}/${pickleId}/like`,
  UNLIKE: (pickleId: number) => `${API.PICKLE}/${pickleId}/unlike`,
  SEARCH: (pickleType: string) => `${API.PICKLE}/${pickleType}`, // 피클검색
  LOCATION_SEARCH: `${API.PICKLE}/search`, // 지역검색
  IN_LOCATION: `${API.PICKLE}/location`, // 지도 내 피클 조회
  REVIEW: (pickleId: number) => `${API.PICKLE}/${pickleId}/review`,
  ATTENDANCE: (pickleId: number) => `${API.PICKLE}/${pickleId}/public`,
  RE_REQUEST: (pickleId: number) => `${API.PICKLE}/${pickleId}/reRequest`,
  RE_REVIEW: (pickleId: number) => `${API.PICKLE}/${pickleId}/reReview`,
  REGENERATE: (pickleId: number) => `${API.PICKLE}/${pickleId}/reReCruiting`, // 피클 재생성

  // 내피클
  MY_PICKEL: (userId: number) => `${API.PICKLE}/${userId}`,
  MY_PICKEL_STATUS: (userId: number, status: string) => `${API.PICKLE}/${userId}/${status}`,
});

export const API_CHAT = Object.freeze({
  INQUIRY: (receiverId: number) => `${API.MESSAGES}/send/${receiverId}`,
  LIST: (senderId: number) => `${API.MESSAGES}/${senderId}`,
  GROUP: (pickleId: number, senderId: number) => `${API.CONVERSATIONS}/${pickleId}/${senderId}`,
});
