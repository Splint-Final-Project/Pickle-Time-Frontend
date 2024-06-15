import routes from '@/constants/routes';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

interface SectionProps {
  children: React.ReactNode;
  sectionBg?: boolean;
}

interface SectionHeaderProps {
  category: 'hotTime' | 'popular' | 'total';
}

const HEADER_CATEGORY_TEXT = {
  hotTime: {
    title: '마감 임박 피클🔥',
    summary: '신청 시간이 얼마 남지 않았어요!',
    totalLink: routes.pickleHotTimeList,
  },
  popular: {
    title: '인기 급상승 피클',
    summary: '참여하고 싶어지는 급상승 피클!',
    totalLink: routes.picklePopularList,
  },
  total: {
    title: '전체 피클',
    summary: '모든 피클을 한 눈에!',
    totalLink: '/',
  },
};

function Container({ children, sectionBg }: SectionProps) {
  return (
    <S.Section $isBackcolor={sectionBg}>
      <S.Container>{children}</S.Container>
    </S.Section>
  );
}

function Header({ category }: SectionHeaderProps) {
  return (
    <S.Wrapper>
      <S.Summary>{HEADER_CATEGORY_TEXT[category].summary}</S.Summary>
      <S.Title>{HEADER_CATEGORY_TEXT[category].title}</S.Title>
      <S.WholeLink href={HEADER_CATEGORY_TEXT[category].totalLink}>전체보기</S.WholeLink>
    </S.Wrapper>
  );
}

const S = {
  Section: styled.section<{ $isBackcolor?: boolean }>`
    ${({ $isBackcolor }) =>
      $isBackcolor &&
      css`
        background-color: #eef6ee;
      `}
  `,
  Container: styled.div`
    padding: 0 2.8rem;
  `,
  Wrapper: styled.div`
    position: relative;
    margin-bottom: 2rem;
  `,
  Summary: styled.p`
    color: #9e9e9e;
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  `,
  Title: styled.h2`
    color: #292929;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.8rem;
  `,
  WholeLink: styled.a`
    position: absolute;
    color: #979797;
    font-size: 1.4rem;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  `,
  ListViewBox: styled.div`
    margin-left: -2.8rem;
    margin-right: -2.8rem;
    overflow-x: auto;
    padding: 0.5rem 0;
    scrollbar-width: none;
  `,
};

const PickleList = { Container, Header };

export default PickleList;
