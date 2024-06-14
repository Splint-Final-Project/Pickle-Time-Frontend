import { DetailPickle } from '@/apis/types/pickles.type';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const useKakaoShare = (url: string, pickle: DetailPickle) => {
  console.log('피클데이터', pickle);
  const kakao = window.Kakao;

  useEffect(() => {
    kakao.cleanup();
    kakao.init(import.meta.env.VITE_KAKAO_CLIENT_ID);
  }, []);

  const shareKakao = () => {
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: pickle?.title,
        description: pickle?.explanation,
        imageUrl: 'https://avatars.githubusercontent.com/u/124874266?v=4',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '피클타임 보러가기✨',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };
  return { shareKakao };
};

export default useKakaoShare;
