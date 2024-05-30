import SearchBar from '@/components/common/SearchBar';
import Button from '@/components/common/button/Button';
import { BUTTON_TYPE } from '@/constants/BUTTON';
import routes from '@/constants/routes';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Pickle() {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));

  useEffect(() => {
    setKeyword(searchParams.get('keyword'));
  }, [searchParams]);

  return (
    <div>
      회원가입
      <Button>PRIMARY</Button>
      <Button styleType={BUTTON_TYPE.SECONDARY}>SECONDARY</Button>
      <SearchBar placeholder="장소를 검색해보세요" uri={routes.signUp} />
      <p>"{keyword}"를 검색한거 맞으시죵?</p>
    </div>
  );
}
