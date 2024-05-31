import useCloseDropdown from '@/hooks/useCloseDropdown';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

type renderListItem = {
  id: number;
  viewValue: number | string;
  value: number | string;
};

interface DropdownInputProps {
  renderList: renderListItem[];
}

export default function DropdownInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ renderList, defaultValue, ...controllterProps }: DropdownInputProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(controllterProps);
  const [isDrop, setIsDrop] = useState(false);
  const selectRef = useRef(null);
  const optionsRef = useRef(null);

  useCloseDropdown({
    selectRef: selectRef,
    optionsRef: optionsRef,
    callback: () => {
      setIsDrop(false);
    },
  });

  return (
    <Styled.DropdownWrapper onClick={() => setIsDrop(prev => !prev)} ref={selectRef}>
      <div>
        <p>{value || defaultValue}</p>
        <Styled.DropdownIconBox>{isDrop ? '⬇️' : '⬆️'}</Styled.DropdownIconBox>
      </div>
      {isDrop && (
        <Styled.DropdownBox ref={optionsRef}>
          {renderList.map(item => (
            <Styled.DropdownItem key={item.id} onClick={() => onChange(item.value)}>
              {item.viewValue}
            </Styled.DropdownItem>
          ))}
        </Styled.DropdownBox>
      )}
    </Styled.DropdownWrapper>
  );
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  DropdownWrapper: styled.div`
    position: relative;
    cursor: pointer;
    width: 100%;
    padding: 8px 12px;
    border: 1px solid black;
  `,
  DropdownIconBox: styled.span`
    position: absolute;
    top: 8px;
    right: 12px;
  `,
  DropdownBox: styled.ul`
    position: absolute;
    top: 120%;
    left: 0;
    border: 1px solid black;
    border-radius: 12px;
    padding: 8px 12px;
    background: #fff;
    z-index: 500;
    width: 100%;
  `,
  DropdownItem: styled.li``,
};
