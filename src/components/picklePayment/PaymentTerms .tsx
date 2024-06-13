import styled from '@emotion/styled';
import CheckIcon from '@/assets/icons/checkIcon.svg';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';

interface PaymentTermsProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TermsContentProps {
  handleClose: () => void;
}

export default function PaymentTerms({ setState }: PaymentTermsProps) {
  const openBSModal = useBottomSheetModal(state => state.handleOpen);
  return (
    <>
      <S.Title>주문 내용 확인 및 결제 동의</S.Title>
      <S.Wrap>
        <S.Inner>
          <S.Input id="terms-checkbox" type="checkbox" onChange={e => setState(e.target.checked)} />
          <S.Label htmlFor="terms-checkbox" className="agree1">
            <span>[필수] 개인정보 수집 이용 동의</span>
          </S.Label>
        </S.Inner>
        <S.ModalBtn onClick={() => openBSModal({ renderComponent: TermsContent })}>내용보기</S.ModalBtn>
      </S.Wrap>
    </>
  );
}

function TermsContent({ handleClose }: TermsContentProps) {
  return (
    <S.Container>
      <S.TermsTitle>개인정보 수입 및 이용</S.TermsTitle>
      <S.TableContainer>
        <S.TermsDescription>
          피클타임은 원활한 서비스제공을 위해 최소한의 범위내에서 아래와 같이 개인정보를 수집, 이용합니다.
        </S.TermsDescription>
        <S.Table>
          <S.Thead>
            <tr>
              <S.Th>구분</S.Th>
              <S.Th>수집 항목</S.Th>
              <S.Th>수집 목적</S.Th>
              <S.Th>보유 및 이용 기간</S.Th>
            </tr>
          </S.Thead>
          <S.Tbody>
            <tr>
              <S.Td>상품 구매</S.Td>
              <S.Td>주문자 정보 (이름, 연락처, 이메일) 수취인 정보 (이름, 연락처, 주소)</S.Td>
              <S.Td>
                상품/경품 배송 및 계약이행, 환불 및 상담 회신, 서비스 개선을 위한 데이터 분석, 맞춤형 콘텐츠 및 서비스
                등 제공 또는 추천
              </S.Td>
              <S.Td rowSpan={3}>
                <strong>
                  회원탈퇴 시 까지. 단, 전자 상거래 등에서 의 소비자보호 에 관한 법률 등 관련 법령의 규정에 따라 거래
                  관계 확인 을 위해 개인정 보를 일정기간 보유할 수 있습 니다.
                </strong>
              </S.Td>
            </tr>
            <tr>
              <S.Td>결제, 취소/환불</S.Td>
              <S.Td>신용카드 정보, 계좌정보(은행 명, 예금주명, 계좌번호)</S.Td>
              <S.Td>환불 서비스 제공</S.Td>
            </tr>
            <tr>
              <S.Td>주문자 정보</S.Td>
              <S.Td>이름</S.Td>
              <S.Td>본인 확인, 회원 제 서비스 이용 및 상담 등을 위해 회원정보 로 등록/관리</S.Td>
            </tr>
          </S.Tbody>
        </S.Table>
        <S.TermsDescription>
          개인정보 제공에 동의하지 않으실 수 있으며, 동의하지 않으실 경우 서비스 이용이 제한될 수 있습니다.
        </S.TermsDescription>
      </S.TableContainer>
      <S.CheckBtn type="button" onClick={handleClose}>
        확인하기
      </S.CheckBtn>
    </S.Container>
  );
}
const S = {
  Title: styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.6rem;
    display: inline-block;
  `,
  Inner: styled.span`
    margin-left: -10px;
  `,
  Wrap: styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 500;
  `,
  Input: styled.input`
    appearance: none;
  `,
  Label: styled.label`
    position: relative;
    padding-left: 2.4rem;
    &::before {
      content: '';
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    input[type='checkbox']:checked + &::before {
      background: #5dc26d;
      border: 1px solid #5dc26d;
      background-image: url(${CheckIcon});
      background-repeat: no-repeat;
      background-position: center center;
    }
  `,
  ModalBtn: styled.button`
    text-decoration: underline;
  `,
  TermsTitle: styled.h2`
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  `,
  Container: styled.div`
    min-width: 37.5rem;
    width: 30vw;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  TableContainer: styled.div`
    padding: 1.5rem 1.2rem;
    border-radius: 4px;
    border: 1px solid #d0d0d0;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  TermsDescription: styled.p`
    font-size: 1.2rem;
    color: #8b8d94;
  `,
  Table: styled.table`
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    width: 100%;
    border-collapse: collapse;
  `,
  Thead: styled.thead`
    font-size: 1.2rem;
    background: #f3f4f6;
  `,
  Th: styled.th`
    border: 1px solid #d0d0d0;
    height: 4.8rem;
    width: calc(100% / 4);
    vertical-align: middle;
  `,
  Tbody: styled.tbody`
    font-size: 1.1rem;
  `,
  Td: styled.td`
    vertical-align: middle;
    border: 1px solid #d0d0d0;
    padding: 1.2rem 0.8rem;
    line-height: 1.2rem;
    strong {
      font-size: 1.2rem;
      font-weight: 700;
    }
  `,
  CheckBtn: styled.button`
    width: 100%;
    border-radius: 4px;
    border-radius: 4px;
    background: var(--Main-Color, #5dc26d);
    color: white;
    height: 42px;
  `,
};
