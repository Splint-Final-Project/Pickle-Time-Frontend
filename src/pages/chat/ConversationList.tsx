import { Link } from 'react-router-dom';

import Conversation from './Conversation';
import { useGetMessages, useSendMessage } from '@/hooks/query/messages';

export default function ConversationList() {
  //server state
  const { data } = useGetMessages("2");
  const { mutate } = useSendMessage({message: "hi"}, "2");

  console.log(data)

  return (
    <div>
      <button type='submit' onClick={mutate}>클릭</button>
      {/* <h1>채팅 목록 페이지입니다</h1> */}
      <Conversation/>
      {/* <Link to="/">홈으로</Link> */}
    </div>
  );
}
