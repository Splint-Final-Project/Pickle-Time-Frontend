import styled from '@emotion/styled';
import BackButton from '@/components/common/button/BackButton';
import Button from '@/components/common/button/Button';
import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon';
import { BUTTON_TYPE } from '@/constants/BUTTON';

export default function EditProfilePage() {
  return (
    <>
      <S.TopSection>
        <S.Header>
          <BackButton />
          <h1>프로필 수정</h1>
        </S.Header>
        {/* 프로필섹션(이미지변경) 따로 분리 필요할듯 */}
        <S.ProfileBox>
          <DefaultProfileIcon />
          <S.NickName>닉네임</S.NickName>
        </S.ProfileBox>
        <S.ButtonBox>
          <Button styleType={BUTTON_TYPE.DISABLE}>
            <img src="/icons/pictureIcon.svg" />
            라이브러리에서 선택
          </Button>
          <Button styleType={BUTTON_TYPE.DISABLE} style={{ marginTop: '1.2rem' }}>
            <img src="/icons/aiIcon.svg" />
            AI로 생성하기
          </Button>
        </S.ButtonBox>
      </S.TopSection>

      <S.BottomSection>
        <S.InnerWrap>
          {/* 컴포넌트 분리 필요 */}
          <h2>주요 활동 범위</h2>
          <div className="setting-box">
            활동 범위 설정하기
            <button onClick={() => console.log('모달 오픈')}>
              <img src="/icons/rightArrowIcon.svg" />
            </button>
          </div>
          <div>설정했던 범위데이터들</div>
          <Button styleType={BUTTON_TYPE.DISABLE} style={{ color: '#8B8D94', margin: '3.5rem 0 3.2rem' }}>
            프로필 설정 완료하기
          </Button>
          <S.Footer>
            <span>회원을 탈퇴하시겠어요?</span>
            <button>회원 탈퇴하기</button>
          </S.Footer>
        </S.InnerWrap>
      </S.BottomSection>
    </>
  );
}

const S = {
  TopSection: styled.div`
    padding: 8rem 1.7rem 3.7rem;
    color: ${({ theme }) => theme.color.basic};

    h1 {
      ${({ theme }) => theme.typography.header};
    }
  `,

  Header: styled.div`
    display: flex;
    gap: 1.5rem;
  `,

  ProfileBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4.3rem 1.6rem 0;
  `,

  NickName: styled.span`
    margin: 1.4rem 0 0.8rem;
    ${({ theme }) => theme.typography.body1}
  `,

  ButtonBox: styled.div`
    border-top: 0.7px solid #d0d0d0;
    padding-top: 1.7rem;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,

  BottomSection: styled.div`
    ::before {
      display: block;
      height: 1.2rem;
      background-color: ${({ theme }) => theme.color.background};
      content: '';
    }
  `,

  InnerWrap: styled.div`
    padding: 2rem 3.3rem 25rem;

    h2 {
      ${({ theme }) => theme.typography.subTitle2};
    }

    & .setting-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin: 1.6rem 0 2.2rem;
      padding: 1.5rem 2rem;
      border-radius: 1.5rem;
      background-color: ${({ theme }) => theme.color.secondary2};
      ${({ theme }) => theme.typography.body3};
    }
  `,

  Footer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: ${({ theme }) => theme.color.inputText};
      ${({ theme }) => theme.typography.detail};
    }

    button {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }
  `,
};
