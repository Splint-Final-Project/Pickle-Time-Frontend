import { Link } from 'react-router-dom';

import Conversation from './Conversation';
import { useGetMessages, useSendMessage } from '@/hooks/query/messages';

export default function ConversationList() {
  //server state
  const { data } = useGetMessages("2");
  const { mutate } = useSendMessage({message: "hi"}, "1");

  const handler = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) return;

		try {
			const res = await fetch(`http://localhost:8080/api/v1/messages/send/2`, {
				method: "POST",

				headers: {
					"Authorization": token,
          "Content-Type": "application/json"
				},

				body: JSON.stringify({message: "hi"}),
			});

      console.log(res);

		} catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button type='submit' onClick={handler}>클릭</button>
      {/* <h1>채팅 목록 페이지입니다</h1> */}
      <Conversation/>
      {/* <Link to="/">홈으로</Link> */}
    </div>
  );
}
