import { useNavigate, useParams } from 'react-router-dom';

import HeartButton from '@/components/common/button/HeartButton';
import { useGetPickelDetail } from '@/hooks/query/pickles';
import routes from '@/constants/routes';
import { formatCurrency } from '@/utils/formatData';

/**
 * 피클 상세 페이지
 */
//Todo: 디자인 나오면 데이터활용해서 ui 구성
export default function PickleList() {
  const navigate = useNavigate();
  const { pickleId = '' } = useParams();

  const { data } = useGetPickelDetail(pickleId);
  const pickleDetailData = data?.data;

  return (
    <>
      안녕피클상세임
      <div>
        <p>우리 스터디는 {pickleDetailData?.title}야.</p>
        <p>{pickleDetailData?.capacity}명 모집할거고</p>
        <p>참가비는 {formatCurrency(pickleDetailData?.cost)}원이고</p>
        <p>
          총 {pickleDetailData?.when.summary}, {pickleDetailData?.where}에서 진행해
        </p>
      </div>
      <button onClick={() => navigate(routes.pickle)}>참여하기</button>
    </>
  );
}
