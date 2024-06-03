import { http, HttpResponse } from 'msw';

export const pickleHandlers = [
  // 피클 찜하기
  http.put('/pickle/:pickleId/scrap', ({ params }) => {
    const { pickleId } = params;

    if (!pickleId) return HttpResponse.json({ message: '존재하지 않는 피클입니다.' }, { status: 400 });
    return HttpResponse.json({ message: '피클을 찜 했어요!' }, { status: 200 });
  }),

  // 피클 찜 취소
  http.delete('/pickle/:pickleId/scrap', ({ params }) => {
    const { pickleId } = params;

    if (!pickleId) return HttpResponse.json({ message: '존재하지 않는 피클입니다.' }, { status: 400 });
    return HttpResponse.json({ message: '찜이 취소되었습니다' }, { status: 200 });
  }),
];
