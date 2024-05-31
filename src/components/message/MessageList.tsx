import Message from "./Message"

import styled from "@emotion/styled";


export default function MessageList() {
  return (
    <MessageContainerStyle>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </MessageContainerStyle>
  );
}

const MessageContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem; /* px-4 */
  flex: 1; /* flex-1 */
  overflow: auto; /* overflow-auto */
  gap: 10px;
`;