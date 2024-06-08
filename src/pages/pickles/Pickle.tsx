import { useNavigate, useParams } from 'react-router-dom';

import HeartButton from '@/components/common/button/HeartButton';
import { useGetPickelDetail } from '@/hooks/query/pickles';
import useHeartButtonClick from '@/hooks/useHeartButtonClick';
import routes from '@/constants/routes';
import { formatCurrency } from '@/utils/formatData';
import useAuth from '@/hooks/zustand/useAuth';

/**
 * 피클 상세 페이지
 */
//Todo: 디자인 나오면 데이터활용해서 ui 구성
export default function Pickle() {
  const navigate = useNavigate();
  const { id: pickleId = '' } = useParams();
  const { getMe } = useAuth();
  const user = getMe();

  const { data } = useGetPickelDetail(pickleId);
  const pickleDetailData = data?.data;

  const { isHeartClicked, handleHeartClick } = useHeartButtonClick({
    pickleId,
    isInUserWishList: false,
  });
  console.log(user._id);
  console.log(pickleDetailData?.participants);
  //check if user is participant of the pickle
  let isLeader = false;
  const isParticipant = pickleDetailData?.participants.some((participant: any) => {
    if (participant.user === user._id) {
      if (participant.isLeader) {
        isLeader = true;
      }
      return true;
    }
    return false;
  });

  //check if user is the leader of the pickle

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
      <HeartButton isActive={isHeartClicked} onClick={handleHeartClick} />
      {isParticipant ? (
        isLeader ? (
          <div>당신이 생성한 피클입니다. [관리하기]</div>
        ) : (
          <div>신청완료된 피클입니다</div>
        )
      ) : (
        <button
          onClick={() =>
            navigate('/pickle-join', {
              state: {
                pickleId,
                pickleTitle: pickleDetailData?.title,
                pickleCost: pickleDetailData?.cost,
              },
            })
          }
        >
          참여하기
        </button>
      )}
    </>
  );
}
