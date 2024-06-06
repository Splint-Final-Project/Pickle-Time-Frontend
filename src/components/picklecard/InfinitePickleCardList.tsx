import WholePickleCard from '@/components/picklecard/WholePickleCard';
import { useGetInfinitePickles } from '@/hooks/query/pickles';
import { WholePickle } from '@/apis/types/pickles.type';
import { GridTemplate } from '@/styles/commonStyles';

export default function InfinitePickleCardList() {
  const { data: infiniteWholePickleData, fetchNextPage } = useGetInfinitePickles();

  return (
    <GridTemplate>
      {infiniteWholePickleData?.pages.map(page =>
        page?.data.map((pickle: WholePickle) => <WholePickleCard key={pickle.id} {...pickle} />),
      )}
    </GridTemplate>
  );
}
