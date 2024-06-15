import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import BackButton from '@/components/common/button/BackButton';
import Category from '@/components/pickle-detail/Category';
import PickleTextInfo from '@/components/pickle-detail/PickleTextInfo';
import LikeCount from '@/components/pickle-detail/LikeCount';
import Button from '@/components/common/button/Button';
import ShareModal from '@/components/common/modal/ShareModal';
import { useGetPickelDetail } from '@/hooks/query/pickles';
import useAuth from '@/hooks/zustand/useAuth';
import routes from '@/constants/routes';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import Tag from '@/components/common/tag/Tag';

/**
 * 피클 상세 페이지
 */
//Todo : 확정된 데이터 나오면 마지막 보완예정

const goals = ['프로젝트 성공', '플젝존버단', '은수님 치킨', '민준님 죠쓰', '현우님 따봉', '주언님 맥주'];

export default function Pickle() {
  const navigate = useNavigate();
  const { pickleId = '' } = useParams();

  const { user } = useAuth();

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
            <h1 className="pickle-title">{pickleDetailData?.title}</h1>
            <LikeCount pickleId={pickleId} likeCount={likeCount} />
          </S.TitleAndLike>
          <S.Thumbnail src="https://avatars.githubusercontent.com/u/124874266?v=4" alt="피클 이미지" />
          <PickleTextInfo
            when={pickleDetailData?.when}
            location={pickleDetailData?.place}
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
          <S.GoalContainer>
            {goals.map(goal => (
              <Tag key={goal} hasHandler={false}>
                {goal}
              </Tag>
            ))}
          </S.GoalContainer>
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
            <img src="/icons/share.svg" />
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

  Thumbnail: styled.img`
    width: 100%;
    height: 15rem;
    margin-bottom: 2rem;
    object-fit: cover;
    border-radius: 0.4rem;
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
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }
  `,

  GoalAndBtn: styled.div`
    padding: 2.6rem 3.4rem 13.6rem;

    & .apply-btn {
      margin-top: 5rem;
    }
  `,

  GoalContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; /* 아이템 간의 간격 설정 */
  `,

  ShareButton: styled.button``,
};
