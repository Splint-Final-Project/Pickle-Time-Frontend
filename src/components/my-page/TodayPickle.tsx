import styled from '@emotion/styled';
import ChalkboardIcon from '@/assets/icons/ChalkboardIcon';
import { When } from '@/apis/types/pickles.type';

interface TodayProps {
  when: When;
  title: string;
}

// TODO: web사이즈에서 칠판이미지 동적으로 그에따라 텍스트 같이 움직이도록 조정필요, 실데이터 연결시 title 기본값삭제
export default function TodayPickle({ when, title = '피클 타이틀' }: TodayProps) {
  return (
    <S.Container>
      <ChalkboardIcon />
      <S.TextBox>
        <S.TextHeader>
          <span className="left">오늘의 피클 타임</span>
          <span className="right">~ 09.11</span>
        </S.TextHeader>
        <S.Title>{title}</S.Title>
      </S.TextBox>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    position: relative;
    max-width: 34rem;
  `,

  TextBox: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 2.2rem 2rem;
  `,

  TextHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1rem;

    & .left {
      color: ${({ theme }) => theme.color.primaryDeepDark};
      ${({ theme }) => theme.typography.subTitle3};
    }
    & .right {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }
  `,

  Title: styled.span`
    color: ${({ theme }) => theme.color.white};
    ${({ theme }) => theme.typography.title2};
  `,
};
