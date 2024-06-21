import styled from '@emotion/styled';
import AreaSelectModal from '@/components/common/modal/AreaSelectModal';
import ActivityArea from '@/components/my-page/edit/ActivityArea';
import useBottomSheetModal from '@/hooks/zustand/useBottomSheetModal';
import { UpdateProfileProps } from '@/apis/types/user.type';

export default function AreaSetting({ profileState, setProfileState }: UpdateProfileProps) {
  const { handleOpen } = useBottomSheetModal(state => state);
  const handleAreaSelectComplete = (newAreaCodes: number[]) => {
    setProfileState({ ...profileState, areaCodes: newAreaCodes });
  };

  return (
    <>
      <S.AreaSettingContainer
        onClick={() =>
          handleOpen({
            renderComponent: AreaSelectModal,
            areaCodes: profileState.areaCodes,
            onComplete: handleAreaSelectComplete,
          })
        }
      >
        활동 범위 수정하기
        <img src="/icons/rightArrowIcon.svg" />
      </S.AreaSettingContainer>
      <ActivityArea areaCodes={profileState.areaCodes} />
    </>
  );
}

const S = {
  AreaSettingContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 1.4rem;
    margin-bottom: 2.1rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.color.secondary2};
    ${({ theme }) => theme.typography.body3};
  `,
};
