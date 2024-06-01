import styled from '@emotion/styled';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

const STAR_ARR = [5, 4, 3, 2, 1];

const SCORE_ICON = {
  '0': '🥺',
  '1': '😢',
  '2': '😐',
  '3': '🙂',
  '4': '😀',
  '5': '😆',
};

export default function ScoreInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...controllerProps }: UseControllerProps<TFieldValues, TName>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(controllerProps);
  return (
    <Styled.Fieldset>
      <Styled.Legend>평점</Styled.Legend>
      <Styled.ScoreWrapper>
        <Styled.ScoreIcon>{SCORE_ICON[value]}</Styled.ScoreIcon>
        {STAR_ARR.map(number => (
          <>
            <Styled.StarInput
              type="radio"
              id={`rating${number}`}
              value={`${number}`}
              onChange={() => onChange(`${number}`)}
              {...controllerProps}
            />
            <Styled.StarLabel htmlFor={`rating${number}`}>⭐</Styled.StarLabel>
          </>
        ))}
      </Styled.ScoreWrapper>
    </Styled.Fieldset>
  );
}
//TODO : 스타일링 추가 및 변경
const Styled = {
  Fieldset: styled.fieldset`
    display: inline-block;
    direction: rtl;
    border: 0;
  `,
  StarInput: styled.input`
    display: none;
    &:checked ~ label {
      text-shadow: 0 0 0 #a00;
    }
  `,
  StarLabel: styled.label`
    font-size: 3rem;
    color: transparent;
    cursor: pointer;
    text-shadow: 0 0 0 #f0f0f0;
    &:hover {
      text-shadow: 0 0 0 #a00;
    }
    &:hover ~ & {
      text-shadow: 0 0 0 #a00;
    }
  `,
  Legend: styled.legend`
    text-align: left;
    margin-bottom: 4px;
    font-size: 12px;
  `,
  ScoreIcon: styled.span`
    font-size: 3rem;
  `,
  ScoreWrapper: styled.div`
    float: left;
  `,
};
