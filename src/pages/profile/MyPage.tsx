import SortButtons from '@/components/common/button/SortButtons';
import InfinitePickleCardList from '@/components/picklecard/InfinitePickleCardList';
import WholePickleCard from '@/components/picklecard/WholePickleCard';
import { GridTemplate } from '@/styles/commonStyles';

export default function MyPage() {
  return (
    <div style={{ width: '76.8rem', padding: '3rem', border: '1px solid black' }}>
      <SortButtons />
      <InfinitePickleCardList />
    </div>
  );
}
