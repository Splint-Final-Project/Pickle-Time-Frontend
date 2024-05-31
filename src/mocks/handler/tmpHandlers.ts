import { http, HttpResponse } from 'msw';

export const tmpHandlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('/api/pickles', () => {
    // resolver
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: '을지로 독서모임',
      },
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: '종로 산악회',
      },
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: '충무로 바둑기원',
      },
      {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: '퇴계로 모각코',
      },
    ]);
  }),
];
