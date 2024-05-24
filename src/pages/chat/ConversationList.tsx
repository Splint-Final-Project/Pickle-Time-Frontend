import { Link } from 'react-router-dom';
import useButtonClick from '@/hooks/zustand/test';

export default function ConversationList() {
  const { count, inc } = useButtonClick();
  return (
    <div>
      <h1>채팅 목록 페이지입니다</h1>
      <button onClick={inc}> Button {count}</button>
      <Link to="/">홈으로</Link>
    </div>
  );
}
