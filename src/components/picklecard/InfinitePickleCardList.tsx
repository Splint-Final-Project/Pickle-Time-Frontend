import { useRef } from 'react';

import WholePickleCard from '@/components/picklecard/WholePickleCard';
import InfinitePickleCardLoader from '@/components/picklecard/InfinitePickleCardLoader';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useGetInfinitePickles } from '@/hooks/query/pickles';
import { WholePickle } from '@/apis/types/pickles.type';
import { GridTemplate } from '@/styles/commonStyles';

export default function InfinitePickleCardList() {
  const loaderRef = useRef<HTMLElement>(null);
  const { data: infiniteWholePickleData, fetchNextPage, hasNextPage } = useGetInfinitePickles();
  const isLastPage = infiniteWholePickleData?.pages === infiniteWholePickleData?.pages;

  useIntersectionObserver(async () => {
    await fetchNextPage();
  }, loaderRef);

  return (
    <>
      <GridTemplate>
        {infiniteWholePickleData?.pages.map(page =>
          page?.data.map((pickle: WholePickle) => <WholePickleCard key={pickle.id} {...pickle} />),
        )}
      </GridTemplate>
      <InfinitePickleCardLoader
        loaderRef={loaderRef}
        style={
          isLastPage && {
            display: 'none',
          }
        }
      />
    </>
  );
}
