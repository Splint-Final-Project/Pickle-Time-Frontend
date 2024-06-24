import { useEffect, useState } from 'react';
import WholePickleCard from '@/components/picklecard/WholePickleCard';
import NoPickle from '@/components/common/NoPickle';
import { SortByOptions } from '@/apis/types/pickles.type';
import { useGetInfinitePickles } from '@/hooks/query/pickles';
import { GridTemplate } from '@/styles/commonStyles';

interface InfinitePickleCardListProps {
  sortBy: SortByOptions['option'];
}

export default function InfinitePickleCardList({ sortBy }: InfinitePickleCardListProps) {
  const { data, isFetching } = useGetInfinitePickles(sortBy);

  const [pickleData, setPickleData] = useState(data?.data || []);

  useEffect(() => {
    if (!isFetching && data) {
      setPickleData(data.data);
    }
  }, [data, isFetching]);

  return pickleData?.length ? (
    <GridTemplate>
      {pickleData.map((pickle: any) => (
        <WholePickleCard key={pickle.id} {...pickle} type={'study'} />
      ))}
    </GridTemplate>
  ) : (
    <div style={{ paddingTop: '3rem' }}>
      <NoPickle />
    </div>
  );
}
