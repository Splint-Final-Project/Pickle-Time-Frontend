import { useRef } from 'react';

import WholePickleCard from '@/components/picklecard/WholePickleCard';
import InfinitePickleCardLoader from '@/components/picklecard/InfinitePickleCardLoader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useGetInfinitePickles } from '@/hooks/query/pickles';
import { WholePickle } from '@/apis/types/pickles.type';
import { GridTemplate } from '@/styles/commonStyles';

export default function InfinitePickleCardList() {
  const { data: infiniteWholePickleData } = useGetInfinitePickles();

  return (
    <>
      <GridTemplate>
        {infiniteWholePickleData?.data.map((pickle: any) =>
          <WholePickleCard key={pickle.id} {...pickle} type={'study'} />
        )}
      </GridTemplate>
    </>
  );
}
