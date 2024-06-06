import styled from '@emotion/styled';

import SpecialPickleCard from '../picklecard/SpecialPickleCard';
import { useGetSpecialPickles } from '@/hooks/query/pickles';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

interface PickleCardListProps {
  category: 'hotTime' | 'popular';
}

export default function PickleCardList({ category }: PickleCardListProps) {
  // const data = useGetSpecialPickles(category);
  const { data } = useSuspenseQuery({
    queryKey: ['pickles'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:8080/api/v1/pickle');
      return data;
    },
    select: data => data.data,
  });
  console.log(data);
  // console.log(data.data);
  return (
    <S.ListInner>
      <S.List>
        {data.map((pickle: any) => (
          <li key={pickle.id}>
            <SpecialPickleCard pickleData={pickle} />
          </li>
        ))}
      </S.List>
    </S.ListInner>
  );
}

const S = {
  ListInner: styled.div`
    display: inline-block;
    padding-left: 2.8rem;
  `,
  List: styled.ul`
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
  `,
};
