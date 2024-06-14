import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import BackButton from '@/components/common/button/BackButton';
import Category from '@/components/pickle-detail/Category';
import PickleTextInfo from '@/components/pickle-detail/PickleTextInfo';
import LikeCount from '@/components/pickle-detail/LikeCount';
import Button from '@/components/common/button/Button';
import { useGetPickelDetail } from '@/hooks/query/pickles';
import useAuth from '@/hooks/zustand/useAuth';
import routes from '@/constants/routes';
import ShareModal from '@/components/common/modal/ShareModal';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';

/**
 * 피클 상세 페이지
 */

export default function Pickle() {
  const navigate = useNavigate();
  const { pickleId = '' } = useParams();

  const { getMe } = useAuth();
  const user = getMe();

  const { data } = useGetPickelDetail(pickleId);
  const pickleDetailData = data?.data;

  //임시 좋아요 수
  const likeCount = 324;
  const { handleOpen } = useBottomSheetModal(state => state);

  return (
    <S.Container>
      <S.TopSection>
        <BackButton />
        <S.TopBox>
          <Category category={pickleDetailData?.category} />
          <button className="inquiry-btn" onClick={() => navigate(routes.chat)}>
            1:1문의하기
          </button>
        </S.TopBox>

        <S.Information>
          <span className="applicant">{pickleDetailData?.participantNumber}명이 신청했어요!</span>
          <S.TitleAndLike>
            <h1 className="pickle-title">{pickleDetailData?.title}긴 제목이면어떨까어떨까가ㅏ가가가ㅏ</h1>
            <LikeCount pickleId={pickleId} likeCount={likeCount} />
          </S.TitleAndLike>
          <div className="pickle-img">이미지자리</div>
          <PickleTextInfo
            when={pickleDetailData?.when}
            location={pickleDetailData?.where}
            capacity={pickleDetailData?.capacity}
            cost={pickleDetailData?.cost}
          />
        </S.Information>
      </S.TopSection>

      <S.BottomSection>
        <S.DetailIntroduction>
          <h3>피클을 소개할게요!</h3>
          <p>{pickleDetailData?.explanation}</p>
        </S.DetailIntroduction>

        <S.GoalAndBtn>
          <h3>피클의 목표에요!</h3>
          <div>목표뱃지들</div>
          <Button
            className="apply-btn"
            onClick={() =>
              navigate('/pickle-join', {
                state: {
                  pickleId,
                  pickleTitle: pickleDetailData?.title,
                  pickleCost: pickleDetailData?.cost,
                },
              })
            }
          >
            피클 신청하기
          </Button>
          <Button
            onClick={() =>
              handleOpen({
                renderComponent: ShareModal,
                data: pickleDetailData,
              })
            }
          >
            공유하기
          </Button>
        </S.GoalAndBtn>
      </S.BottomSection>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    color: ${({ theme }) => theme.color.basic};

    h3 {
      margin-bottom: 1.2rem;
      ${({ theme }) => theme.typography.subTitle4}
    }
  `,

  TopSection: styled.div`
    padding: 9rem 3.4rem 2.7rem;
  `,

  TopBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 3.7rem 0 2.3rem;

    & .inquiry-btn {
      padding: 0.5rem 0.8rem;
      border-radius: 1.8rem;
      border: ${({ theme }) => theme.border};
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};

      &:hover {
        background-color: #f7f7f7; //임시
      }
    }
  `,

  Information: styled.div`
    & .applicant {
      color: ${({ theme }) => theme.color.primary};
      ${({ theme }) => theme.typography.body1};
    }
    & .pickle-img {
      height: 12.3rem;
      margin-bottom: 2rem;
      background-color: #ccc;
    }
  `,

  TitleAndLike: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin: 0.6rem 0 1.4rem;

    & .pickle-title {
      ${({ theme }) => theme.typography.header};
    }
  `,

  BottomSection: styled.div`
    ::before {
      display: block;
      height: 1.1rem;
      background-color: ${({ theme }) => theme.color.background};
      content: '';
    }
  `,

  DetailIntroduction: styled.div`
    padding: 2.6rem 3.4rem 2.7rem;
    border-bottom: ${({ theme }) => theme.border};

    p {
      color: ${({ theme }) => theme.color.inputText};
      ${({ theme }) => theme.typography.body1};
    }
  `,

  GoalAndBtn: styled.div`
    padding: 2.6rem 3.4rem 13.6rem;

    & .apply-btn {
      margin-top: 5rem;
    }
  `,
};
