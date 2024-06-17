import AroundPickleCard from '@/components/picklecard/AroundPickleCard';
import { useGetNearbyPickles } from '@/hooks/query/pickles';

/**
 * 내 주변 페이지
 */

export default function AroundMe() {
  // 임시 location
  const location = {
    latitude: 37.5415662783673,
    longitude: 127.017393782846,
  };
  const { data } = useGetNearbyPickles(location);
  const nearbyPickle = data?.data;

  return (
    <>
      {nearbyPickle.map(pickle => (
        <AroundPickleCard
          pickleId={pickle?.id}
          title={pickle?.title}
          //TODO : 데이터에 아직 안들어가서 아래 임시 링크 쓴거에요! 서버 데이터 바뀌면 이거사용하고 아래지워주세요~
          // imgUrl={pickle?.imgUrl}
          imgUrl="https://avatars.githubusercontent.com/u/124874266?v=4"
          when={pickle?.when}
          cost={pickle?.cost}
        />
      ))}
    </>
  );
}
