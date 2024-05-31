import MessageList from '@/components/message/MessageList';

import styled from '@emotion/styled';

export default function Conversation() {
  return (
    <ContainerStyle>
      <>
        {/* Header */}
        <HeaderStyle>
          <LabelText>To:</LabelText> <ToText>John Doe</ToText>
        </HeaderStyle>

        <MessageList />
        {/* <MessageInput /> */}
      </>
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div`
  @media (min-width: 768px) {
    min-width: 450px;
  }
  display: flex;
  flex-direction: column;
`;

const HeaderStyle = styled.div`
  background-color: #64748b; /* bg-slate-500 */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  margin-bottom: 0.5rem; /* mb-2 */
`;

const LabelText = styled.span`
  font-size: 0.875rem; /* text-sm */
  line-height: 1.25rem; /* leading-5 */
  color: #4b5563; /* text-gray-600 */
`;

const ToText = styled.span`
  color: #1f2937; /* text-gray-900 */
  font-weight: 700; /* font-bold */
`;