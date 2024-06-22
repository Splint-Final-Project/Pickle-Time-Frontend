import WholePickleCard from '@/components/picklecard/WholePickleCard';
import { useGetInfinitePickles } from '@/hooks/query/pickles';
import { GridTemplate } from '@/styles/commonStyles';

export default function InfinitePickleCardList() {
  const { data: infiniteWholePickleData } = useGetInfinitePickles();

  return (
    <>
      <GridTemplate>
        {infiniteWholePickleData?.data.map((pickle: any) => (
          <WholePickleCard key={pickle.id} {...pickle} type={'study'} />
        ))}
      </GridTemplate>
    </>
  );
}
