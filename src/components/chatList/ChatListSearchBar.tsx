import { KeyboardEvent, useState } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@/assets/icons/SearchIcon';

interface ChatListSearchBarProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatListSearchBar({ setValue }: ChatListSearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const handleSearchEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    handleInputValue();
  };
  const handleInputValue = () => {
    setValue(inputValue);
    setInputValue('');
  };
  return (
    <S.Wrapper>
      <S.Input
        type="text"
        placeholder="제목으로 검색"
        onKeyDown={handleSearchEvent}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <S.SearchButton onClick={handleInputValue}>
        <span>
          <SearchIcon size={24} />
        </span>
      </S.SearchButton>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    position: relative;
    height: 4.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f4f7f6;
    width: 100%;
    margin: 0 auto 2rem;

    border-radius: 0.8rem;
    max-width: 46rem;
  `,
  Input: styled.input`
    flex: 1;
    font-size: 1.6rem;
    padding: 0.8rem 1.2rem 0.8rem 1.5rem;
    border: none;
    background: transparent;
    height: inherit;
  `,
  SearchButton: styled.button`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    padding-right: 1.2rem;
  `,
};
