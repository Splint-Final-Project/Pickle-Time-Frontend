import { Link } from 'react-router-dom';

import Conversation from './Conversation';

export default function ConversationList() {
  return (
    <div>
      <h1>채팅 목록 페이지입니다</h1>
      <Conversation/>
      <Link to="/">홈으로</Link>
    </div>
  );
}
