import SortButtons from '@/components/common/button/SortButtons';
import InfinitePickleCardList from '@/components/picklecard/InfinitePickleCardList';

export default function MyPage() {
  return (
    <div style={{ width: '76.8rem', padding: '3rem', border: '1px solid black' }}>
      <SortButtons />
      <InfinitePickleCardList />
    </div>
  );
}
