import styled from '@emotion/styled';

export default function Message() {
  return (
    <ChatContainer>
      <ChatImage className="chat-image avatar">
        <Avatar alt="Tailwind CSS chat bubble component"
            src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png">
        </Avatar>
      </ChatImage>
      <ChatBubble>Hi!</ChatBubble>
      <ChatFooter>12:42</ChatFooter>
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* chat-end */
  gap: 2px;
`;

const ChatImage = styled.div`
  display: flex;
  align-items: center;
  /* margin-bottom: 0.5rem; Adjust the margin as needed */
`;

const Avatar = styled.img`
  width: 2.5rem; /* w-10 */
  border-radius: 9px; /* rounded-full */
  overflow: hidden;
`;

const ChatBubble = styled.div`
  background-color: #3b82f6; /* bg-blue-500 */
  color: white; /* text-white */
  padding: 0.75rem; /* Add padding as needed */
  border-radius: 1rem; /* chat-bubble */
  max-width: 75%; /* Optional: adjust the max-width */
`;

const ChatFooter = styled.div`
  opacity: 0.5; /* opacity-50 */
  font-size: 0.75rem; /* text-xs */
  display: flex;
  gap: 0.25rem; /* gap-1 */
  align-items: center;
`;