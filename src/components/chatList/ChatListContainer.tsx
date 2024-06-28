import { useEffect, useState } from 'react';
import CategoryFilterBar, { CategoryType } from './CategoryFilterBar';
import ChatList from './ChatList';
import ChatListSearchBar from './ChatListSearchBar';
import { useSearchParams } from 'react-router-dom';

export default function ChatListContainer() {
  // const [currentCategory, setCurrentCategory] = useState<CategoryType>('전체');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory: CategoryType = (searchParams.get('tab') as CategoryType) || 'all';
  const [searchValue, setSearchValue] = useState('');
  function setCurrentCategory(category: CategoryType) {
    searchParams.set('tab', category);
    setSearchParams(searchParams, { replace: true });
  }

  useEffect(() => {
    if (searchParams.get('tab') === null) {
      searchParams.set('tab', 'all');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams.get('tab')]);

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
