import routes from '@/constants/routes';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  summary: string;
  children?: ReactNode;
}

export default function PickleListHeader({ title, summary, children }: HeaderProps) {
  return (
    <S.Wrapper>
      <S.Section>
        <S.BackButtonWrapper>
          <S.BackButton to={routes.home}>
            <S.Icon src="/icons/backButton.svg" alt="Back Button" />
          </S.BackButton>
        </S.BackButtonWrapper>
        <S.Summary>{summary}</S.Summary>
        <S.Title>{title}</S.Title>
      </S.Section>
      {children}
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    position: relative;
    padding: 10rem 2.9rem 3rem;
  `,
  Section: styled.section``,
  BackButtonWrapper: styled.div`
    margin-left: -1rem;
    margin-bottom: 3.5rem;
  `,
  BackButton: styled(Link)`
    padding: 0.5rem 0.5rem 0.5rem 0.9rem;
  `,
  Icon: styled.img`
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  `,
  Summary: styled.p`
    color: #9e9e9e;
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.7rem;
  `,
  Title: styled.h2`
    color: #292929;
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 1.8rem;
    display: flex;
  `,
  ImgContainer: styled.div`
    margin-left: 1.7rem;
    display: flex;
    gap: 0.8rem;
  `,
  ImgWrapper: styled.div`
    width: 2.5rem;
    height: 2.5rem;
  `,
};
