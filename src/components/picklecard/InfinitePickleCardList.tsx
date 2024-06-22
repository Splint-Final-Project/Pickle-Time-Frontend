import { SortByOptions } from '@/apis/types/pickles.type';
import WholePickleCard from '@/components/picklecard/WholePickleCard';
import { useGetInfinitePickles } from '@/hooks/query/pickles';
import { GridTemplate } from '@/styles/commonStyles';
import { useEffect, useState } from 'react';

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

  return (
    <GridTemplate>
      {pickleData?.map((pickle: any) => <WholePickleCard key={pickle.id} {...pickle} type={'study'} />)}
    </GridTemplate>
  );
}
