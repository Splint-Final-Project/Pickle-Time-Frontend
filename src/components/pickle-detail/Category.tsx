import styled from '@emotion/styled';

const categoryIcons = {
  스터디: 'study',
  취미: 'hobby',
  운동: 'exercise',
};

type Category = keyof typeof categoryIcons;
interface Props {
  category: Category;
}

export default function Category({ category }: Props) {
  const icon = `/icons/pickle-category/${categoryIcons[category]}.svg`;

  return (
    <S.Category>
      <img src={icon} alt={category} />
      <span>{category}</span>
    </S.Category>
  );
}

const S = {
  Category: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.subTitle3};
    }
  `,
};
