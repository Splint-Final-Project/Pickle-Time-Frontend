export const API = Object.freeze({
  AUTH: '/user',
  PICKLE: '/pickle',
  MESSAGES: '/messages',
  CONVERSATIONS: '/conversations',
  LIKE: '/favorite',
});

export const API_AUTH = Object.freeze({
  LOGIN: `${API.AUTH}/login`,
  ME: `${API.AUTH}/me`,
  JOIN: `${API.AUTH}/join`,
  JOIN2: `${API.AUTH}/join2`,
  LOGOUT: `${API.AUTH}/logout`,
  BY_ID: (userId: string) => `${API.AUTH}/${userId}`,
});

export const API_PICKLE = Object.freeze({
  NEARBY: `${API.PICKLE}/nearby`,
  CREATE: `${API.PICKLE}/create`,
  POPULAR: `${API.PICKLE}/popular`,
  HOT_TIME: `${API.PICKLE}/hotTime`,
  CREATE_IMG: `${API.PICKLE}/img`,
  CREATE_GENERATED_IMG: `${API.PICKLE}/generatedImg`,
  BY_ID: (pickleId: string) => `${API.PICKLE}/${pickleId}`,
  FAVORITES_COUNT: (pickleId: string) => `${API.PICKLE}/${pickleId}/favorite`,
  SEARCH: (pickleType: string) => `${API.PICKLE}/${pickleType}`, // 피클검색
  LOCATION_SEARCH: `${API.PICKLE}/search`, // 지역검색
  IN_LOCATION: `${API.PICKLE}/location`, // 지도 내 피클 조회
  REVIEW: (pickleId: string) => `${API.PICKLE}/${pickleId}/review`,
  ATTENDANCE: (pickleId: string) => `${API.PICKLE}/${pickleId}/public`,
  RE_REQUEST: (pickleId: string) => `${API.PICKLE}/${pickleId}/reRequest`,
  RE_REVIEW: (pickleId: string) => `${API.PICKLE}/${pickleId}/reReview`,
  REGENERATE: (pickleId: string) => `${API.PICKLE}/${pickleId}/reReCruiting`, // 피클 재생성

  // 내피클
  MY_PICKEL: (userId: string) => `${API.PICKLE}/${userId}`,
  MY_PICKEL_STATUS: (userId: string, status: string) => `${API.PICKLE}/${userId}/${status}`,
});

export const API_LIKE = Object.freeze({
  GET: (pickleId: string) => `${API.LIKE}/${pickleId}`,
  GETALL: () => `${API.LIKE}`,
  CREATE: (pickleId: string) => `${API.LIKE}/${pickleId}`,
  DELETE: (pickleId: string) => `${API.LIKE}/${pickleId}`,
});

export const API_CHAT = Object.freeze({
  INQUIRY: (receiverId: string) => `${API.MESSAGES}/send/${receiverId}`,
  LIST: (senderId: string) => `${API.MESSAGES}/${senderId}`,
  GROUP: (pickleId: string, senderId: string) => `${API.CONVERSATIONS}/${pickleId}/${senderId}`,
});
