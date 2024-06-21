import styled from '@emotion/styled';
import { showErrorToast, showToast } from '@/components/common/Toast';
import { DetailPickle } from '@/apis/types/pickles.type';
import useKakaoShare from '@/hooks/useKakaoShare';

interface Props {
  handleClose: () => void;
  data: DetailPickle;
}

export default function ShareModal({ handleClose, data: pickle }: Props) {
  const currentUrl = window.location.href;
  const { shareKakao } = useKakaoShare(currentUrl, pickle);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      handleClose();
      showToast('링크가 복사되었어요!✨');
    } catch (err) {
      showErrorToast('링크 복사에 실패했어요!🥲');
    }
  };

  return (
    <S.Container>
      <S.Title>공유하기</S.Title>
      <S.Button onClick={shareKakao}>
        <S.IconWrap className="kakao">
          <img src="/icons/kakaotalk.svg" />
        </S.IconWrap>
        카카오톡
      </S.Button>
      <S.Button onClick={handleCopyLink}>
        <S.IconWrap className="link-copy">
          <img src="/icons/share.svg" />
        </S.IconWrap>
        링크복사
      </S.Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    text-align: center;
    padding-top: 0.3rem;
  `,

  Title: styled.div`
    margin-bottom: 2rem;
    ${({ theme }) => theme.typography.subTitle3}
    font-weight: 700;
  `,

  Button: styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 1.2rem;
    ${({ theme }) => theme.typography.subTitle3};
    font-weight: normal;

    &:hover {
      font-weight: 600;
    }
  `,

  IconWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    width: 4rem;
    height: 4rem;
    margin-right: 2.4rem;
    border-radius: 50%;

    &.kakao {
      background-color: #fee500;
    }
    &.link-copy {
      background-color: ${({ theme }) => theme.color.basic};
    }
  `,
};
