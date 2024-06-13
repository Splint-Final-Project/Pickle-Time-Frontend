import { CreateReviewData } from '@/apis/types/pickles.type';
import { http, HttpResponse } from 'msw';

const reviews = new Map();

export const pickleHandlers = [
  // 피클 찜하기
  http.put('http://localhost:8080/api/v1/pickle/:pickleId/scrap', ({ params }) => {
    const { pickleId } = params;
    console.log('아이디', pickleId);

    if (!pickleId) return HttpResponse.json({ message: '존재하지 않는 피클입니다.' }, { status: 400 });
    return HttpResponse.json({ message: '피클을 찜 했어요!' }, { status: 200 });
  }),

  // 피클 찜 취소
  http.delete('http://localhost:8080/api/v1/pickle/:pickleId/scrap', ({ params }) => {
    const { pickleId } = params;

    if (!pickleId) return HttpResponse.json({ message: '존재하지 않는 피클입니다.' }, { status: 400 });
    return HttpResponse.json({ message: '찜이 취소되었습니다' }, { status: 200 });
  }),

  // 리뷰 작성
  http.post('http://localhost:8080/api/v1/pickle/:pickleId/review', async ({ params, request }) => {
    const { pickleId } = params;
    if (!pickleId) return HttpResponse.json({ message: '존재하지 않는 피클입니다.' }, { status: 400 });

    const review: CreateReviewData = await request.json();
    console.log('생성된리뷰', review);

    const newReview = {
      reviewId: `${pickleId}-${Date.now()}`,
      pickleId,
      star: review.star,
      reviewText: review.reviewText,
      createdAd: new Date().toISOString(),
    };
    reviews.set(newReview.reviewId, newReview);

    return HttpResponse.json(newReview, { status: 201 });
  }),
];
