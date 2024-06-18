import AroundPickleCard from '@/components/picklecard/AroundPickleCard';
import { useGetNearbyPickles } from '@/hooks/query/pickles';
import { useGeolocation } from '@/hooks/useGeolocation';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useSearchParams } from 'react-router-dom';

/**
 * 내 주변 페이지
 */

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 4,
};

export default function AroundMe() {
  const { location: initialLocation, error } = useGeolocation(geolocationOptions);

  const [searchParams, setSearchParams] = useSearchParams();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const location = {
    latitude: Number(searchParams.get('lat')),
    longitude: Number(searchParams.get('lng')),
  };
  const level = Number(searchParams.get('level'));

  const { data } = useGetNearbyPickles(location, level);
  const nearbyPickle: any[] = data?.data || [];

  useEffect(() => {
    function handleMapMove() {
      if (map === null) return;
      const level = map.getLevel();
      setSearchParams(
        {
          lat: map.getCenter().getLat() + '',
          lng: map.getCenter().getLng() + '',
          level: level + '',
        },
        { replace: true },
      );
    }
    if (map) {
      kakao.maps.event.addListener(map, 'center_changed', handleMapMove);
    }
    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, 'center_changed', handleMapMove);
      }
    };
  });

  useEffect(() => {
    if (initialLocation && searchParams.get('lat') === null && searchParams.get('lng') === null) {
      setSearchParams(
        {
          lat: initialLocation.latitude + '',
          lng: initialLocation.longitude + '',
          level: '4',
        },
        { replace: true },
      );
    }
  }, [initialLocation]);

  return (
    <Container>
      <h1>제목제목제목</h1>
      <h2>위치 기반으로 피클 찾기~~</h2>
      <br />
      <br />
      <br />
      <h1>검색하기</h1>
      <h1>카테고리 고르기</h1>
      <br />
      <br />
      <br />
      {initialLocation && location ? (
        <MapContainer>
          <ReCenterButton
            src="/icons/recenter.svg"
            alt="recenter"
            onClick={() => {
              map?.setCenter(new kakao.maps.LatLng(initialLocation.latitude, initialLocation.longitude));
              setSearchParams(
                {
                  lat: initialLocation.latitude + '',
                  lng: initialLocation.longitude + '',
                },
                { replace: true },
              );
            }}
          />
          <Map
            center={{ lat: initialLocation.latitude, lng: initialLocation.longitude }}
            style={{ width: '100%', height: '100%', marginTop: '-70px' }}
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
              minClusterSize={2}
              minLevel={1}
              disableClickZoom={true}
              onClusterclick={(_target, cluster) => {
                map?.setCenter(cluster.getCenter());
                map?.setLevel(2);
                setSearchParams(
                  {
                    lat: cluster.getCenter().getLat() + '',
                    lng: cluster.getCenter().getLng() + '',
                    level: '2',
                  },
                  { replace: true },
                );
              }}
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
                  clickable={true}
                  onClick={() => {
                    map?.setCenter(new kakao.maps.LatLng(pickle.latitude, pickle.longitude));
                    map?.setLevel(2);
                    setSearchParams(
                      {
                        lat: pickle.latitude + '',
                        lng: pickle.longitude + '',
                        level: '2',
                      },
                      { replace: true },
                    );
                  }}
                  image={{
                    src: `${
                      pickle?.category === '스터디'
                        ? '/icons/studyMarker.svg'
                        : pickle.category === '운동'
                          ? '/icons/undongMarker.svg'
                          : '/icons/chimiMarker.svg'
                    }`,
                    size: {
                      width: 80,
                      height: 80,
                    },
                    options: {
                      offset: {
                        x: 50,
                        y: 50,
                      },
                    },
                  }}
                ></MapMarker>
              ))}
            </MarkerClusterer>
          </Map>
          <PickleCardContainer>
            {nearbyPickle?.map((pickle: any) => (
              <AroundPickleCard
                key={pickle?.id}
                pickleId={pickle?.id}
                title={pickle?.title}
                imgUrl={pickle?.imgUrl}
                when={pickle?.when}
                cost={pickle?.cost}
              />
            ))}
          </PickleCardContainer>
        </MapContainer>
      ) : (
        <div>{'asdfasfdasdfasf' + error}</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ReCenterButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  z-index: 10;
`;

const PickleCardContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 100px;
  display: flex;
  flex-shrink: 0;
  overflow: scroll;
  padding: 0 20px;
  gap: 20px;
  z-index: 10;
`;
