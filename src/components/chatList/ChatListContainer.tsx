import { useState } from 'react';
import CategoryFilterBar, { CategoryType } from './CategoryFilterBar';
import ChatList from './ChatList';
import ChatListSearchBar from './ChatListSearchBar';

export default function ChatListContainer() {
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('전체');
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <ChatListSearchBar setValue={setSearchValue} />
      <CategoryFilterBar
        setCategory={setCurrentCategory}
        currentCategory={currentCategory}
        resetInputValue={setSearchValue}
      />
      <ChatList currentCategory={currentCategory} searchValue={searchValue} />
    </>
  );
}
