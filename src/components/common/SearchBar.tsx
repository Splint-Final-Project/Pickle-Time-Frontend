import SearchIcon from '@/assets/icons/SearchIcon';
import styled from '@emotion/styled';
import { InputHTMLAttributes, KeyboardEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 공통 검색창 컴포넌트
 */

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  uri: string;
}

export default function SearchBar({ placeholder, uri, ...htmlInputProps }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const navigateToKeyword = (input: string) => {
    const keyword = input?.replace(/(\s*)/g, '');
    if (keyword === '') return;

    navigate({
      pathname: uri,
      search: `?keyword=${keyword}`,
    });
  };

  const handleEnterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    navigateToKeyword(inputRef.current.value);
  };

  return (
    <S.Container>
      <S.Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleEnterKeyDown}
        {...htmlInputProps}
      />
      <SearchIcon size={24} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    padding: 1rem;

    border: 1px solid #a0d911;
    border-radius: 0.4rem;
  `,

  Input: styled.input`
    width: 100%;
    height: 100%;
    border: none;
    font-size: 1.6rem;
  `,
};
