import { useRef } from 'react';

import WholePickleCard from '@/components/picklecard/WholePickleCard';
import InfinitePickleCardLoader from '@/components/picklecard/InfinitePickleCardLoader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useGetInfinitePickles } from '@/hooks/query/pickles';
import { WholePickle } from '@/apis/types/pickles.type';
import { GridTemplate } from '@/styles/commonStyles';

export default function InfinitePickleCardList() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { data: infiniteWholePickleData, fetchNextPage, hasNextPage } = useGetInfinitePickles();

  useIntersectionObserver(async () => {
    await fetchNextPage();
  }, loaderRef);

  return (
    <>
      <GridTemplate>
        {infiniteWholePickleData?.pages.map(page =>
          page?.data.map((pickle: WholePickle) => <WholePickleCard key={pickle.id} {...pickle} type={'study'} />),
        )}
      </GridTemplate>

      <InfinitePickleCardLoader
        loaderRef={loaderRef}
        style={!hasNextPage ? { display: 'none' } : { marginTop: '2rem' }}
      />
    </>
  );
}
