import { useState } from 'react';
import styled from '@emotion/styled';

import {
  AreaSelector,
  GuElement,
  GuSelector,
  SelectedGu,
  SelectedGus,
  SiElement,
  SiSelector,
} from '@/pages/auth/SignUpStyled';
import { SigusType } from '@/pages/auth/SignUp2.page';
import Button from '@/components/common/button/Button';
import { map, sigus, sis } from '@/constants/areas';
import { BUTTON_TYPE } from '@/constants/BUTTON';

interface AreaCodes {
  areaCodes: number[];
  onComplete: (selectedAreaCodes: number[]) => void;
  handleClose: () => void;
}

export default function AreaSelectModal({ areaCodes, onComplete, handleClose }: AreaCodes) {
  const [selectedSi, setSelectedSi] = useState<string>('seoul');
  const [selectedGus, setSelectedGus] = useState<Set<number>>(new Set(areaCodes));

  const handleClickGu = (code: number) => {
    setSelectedGus(prev => {
      if (prev.has(code)) {
        prev.delete(code);
      } else {
        prev.add(code);
      }
      return new Set(prev);
    });
  };

  const handleComplete = () => {
    onComplete(Array.from(selectedGus));
    handleClose();
  };

  return (
    <S.Container>
      <h1>주요 활동 범위</h1>
      <h3>원하는 모임 장소를 설정해 주세요</h3>
      <S.AreaSelector>
        <SiSelector>
          {sis.map(si => (
            <SiElement
              key={si.value}
              $selected={si.value === selectedSi}
              data-value={si.value}
              onClick={() => setSelectedSi(si.value)}
            >
              {si.label}
            </SiElement>
          ))}
        </SiSelector>
        <GuSelector>
          {(sigus as SigusType)[selectedSi].map(gu => (
            <GuElement
              key={gu.gu + (selectedGus.has(gu.code) ? '1' : '0')}
              $selected={selectedGus.has(gu.code)}
              onClick={() => handleClickGu(gu.code)}
            >
              {gu.gu}
            </GuElement>
          ))}
        </GuSelector>
      </S.AreaSelector>
      <SelectedGus>
        {Array.from(selectedGus).map(code => {
          const item = map.get(code);
          return (
            <SelectedGu key={code}>
              {item.si + ' ' + item.gu}
              <img src="/icons/x.svg" alt="x" onClick={() => handleClickGu(code)}></img>
            </SelectedGu>
          );
        })}
      </SelectedGus>
      <Button
        onClick={handleComplete}
        styleType={BUTTON_TYPE.DISABLE}
        style={{ color: '#8B8D94', marginTop: '2.2rem' }}
      >
        주요 활동 범위 변경 완료하기
      </Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 2.8rem 0;
    margin-bottom: 0.4rem;
    ${({ theme }) => theme.typography.subTitle2}

    h3 {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body2}
    }
  `,

  AreaSelector: styled(AreaSelector)`
    margin: 2.4rem 0 2rem;
  `,
};
