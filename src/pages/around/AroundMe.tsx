import { useGetNearbyPickles } from '@/hooks/query/pickles';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';

/**
 * 내 주변 페이지
 */

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 4,
};

export default function AroundMe() {
  const { location: initialLocation, error } = useGeolocation(geolocationOptions);
  const [location, setLocation] = useState(initialLocation);
  const [level, setLevel] = useState(4);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const { data } = useGetNearbyPickles(location, level);
  const nearbyPickle: any[] = data?.data || [];

  useEffect(() => {
    function handleChange() {
      if (map === null) return;
      const level = map.getLevel();
      setLevel(level);
      const latlng = map.getCenter();
      setLocation({
        latitude: latlng.getLat(),
        longitude: latlng.getLng(),
      });
    }
    if (map) {
      kakao.maps.event.addListener(map, 'center_changed', handleChange);
    }
    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, 'center_changed', handleChange);
      }
    };
  });

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      {initialLocation ? (
        <>
          <Map
            center={{ lat: initialLocation.latitude, lng: initialLocation.longitude }}
            style={{ width: '100%', height: '400px' }}
            level={4}
            onCreate={setMap}
          >
            <MapMarker
              position={{ lat: initialLocation.latitude, lng: initialLocation.longitude }}
              image={{
                src: '/icons/currentLocation.svg',
                size: {
                  width: 28,
                  height: 28,
                },
                options: {
                  offset: {
                    x: 14,
                    y: 14,
                  },
                },
              }}
            />
            <MarkerClusterer
              gridSize={40}
              averageCenter={true}
              minClusterSize={1}
              minLevel={1}
              disableClickZoom={false}
              // onClusterclick={(cluster: any) => {
              //   console.log('cluster', cluster);
              // }}
              styles={[
                {
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(93, 194, 109, 1)',
                  borderRadius: '50%',
                  color: 'white',
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                },
              ]}
            >
              {nearbyPickle?.map((pickle: any) => (
                <MapMarker
                  key={pickle?.id}
                  position={{ lat: pickle?.latitude, lng: pickle?.longitude }}
                  title={pickle?.title}
                  image={{
                    src: '/icons/mapmarker.svg',
                    size: {
                      width: 32,
                      height: 44,
                    },
                    options: {
                      offset: {
                        x: 16,
                        y: 44,
                      },
                    },
                  }}
                />
              ))}
            </MarkerClusterer>
          </Map>
        </>
      ) : (
        <div>지도 로딩중</div>
      )}
      {/* {nearbyPickle?.map((pickle: any) => (
        <AroundPickleCard
          key={pickle?.id}
          pickleId={pickle?.id}
          title={pickle?.title}
          imgUrl={pickle?.imgUrl}
          when={pickle?.when}
          cost={pickle?.cost}
        />
      ))} */}

      {/* {markerData.map(marker => (
        <MapMarker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          title={marker.name}
          image={{ src: image, size: { width: 30, height: 30 } }}
          onClick={() => handleMarkerClick(marker)} // 마커 클릭 이벤트 추가
        >
           name을 적으면 Map의 center에서 오류가 발생함, name이 적용할 경우 위에 있는 useEffect 코드에 있는 주석 부분으로 수정해야함
          <div style={{ color: '#000' }}>{marker.name}</div>
        </MapMarker>
      ))} */}
    </>
  );
}
