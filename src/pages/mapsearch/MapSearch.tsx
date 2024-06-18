import AroundPickleCard from '@/components/picklecard/AroundPickleCard';
import { useGetNearbyPickles } from '@/hooks/query/pickles';
import { useGeolocation } from '@/hooks/useGeolocation';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useSearchParams } from 'react-router-dom';

/**
 * 내 주변 페이지
 */

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 4,
};

export default function MapSearch() {
  const { location: initialLocation, error } = useGeolocation(geolocationOptions);

  const [searchParams, setSearchParams] = useSearchParams();
  const [jusoSearch, setJusoSearch] = useState('');
  const [jusoList, setJusoList] = useState<any[] | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const location = {
    latitude: Number(searchParams.get('lat')),
    longitude: Number(searchParams.get('lng')),
  };
  const level = Number(searchParams.get('level'));

  const { data } = useGetNearbyPickles(location, level);
  const nearbyPickle: any[] = data?.data || [];

  async function handleJusoSearch() {
    if (!jusoSearch) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(jusoSearch, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setJusoList(data?.slice(0, 5) || []);
      } else {
        toast.error('검색 결과가 없습니다.');
      }
    });
  }

  useEffect(() => {
    function handleMapMove() {
      if (map === null) return;
      const level = map.getLevel();

      searchParams.set('lat', map.getCenter().getLat() + '');
      searchParams.set('lng', map.getCenter().getLng() + '');
      searchParams.set('level', level + '');
      setSearchParams(searchParams, { replace: true });
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
      searchParams.set('lat', initialLocation.latitude + '');
      searchParams.set('lng', initialLocation.longitude + '');
      searchParams.set('level', '4');
      setSearchParams(searchParams, { replace: true });
    }
  }, [initialLocation]);

  return (
    <Container>
      <h1>제목제목제목</h1>
      <h2>위치 기반으로 피클 찾기~~</h2>
      <br />
      <h1>검색하기</h1>
      <h1>카테고리 고르기</h1>
      <br />
      <InputContainer>
        <InputField
          type="text"
          id="juso"
          name="jusoSearch"
          placeholder="장소, 지명 검색"
          value={jusoSearch}
          onChange={e => setJusoSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleJusoSearch();
            }
          }}
        />
        <SearchButton
          src="icons/magnifier.svg"
          alt="search"
          onClick={e => {
            handleJusoSearch();
          }}
        />
      </InputContainer>

      {initialLocation && location ? (
        <MapContainer>
          {jusoList ? (
            <JusoOptions>
              {jusoList.map((juso, i) => (
                <JusoOption
                  key={i}
                  onClick={() => {
                    setJusoSearch(juso.place_name);
                    map?.setCenter(new kakao.maps.LatLng(Number(juso.y), Number(juso.x)));
                    map?.setLevel(4);
                    searchParams.set('lat', juso.y + '');
                    searchParams.set('lng', juso.x + '');
                    searchParams.set('level', '4');
                    setSearchParams(searchParams, { replace: true });
                    setJusoList(null);
                  }}
                >
                  {juso.place_name}
                  <span>{juso.road_address_name}</span>
                </JusoOption>
              ))}
            </JusoOptions>
          ) : (
            <ReCenterButton
              src="/icons/recenter.svg"
              alt="recenter"
              onClick={() => {
                map?.setCenter(new kakao.maps.LatLng(initialLocation.latitude, initialLocation.longitude));
                searchParams.set('lat', initialLocation.latitude + '');
                searchParams.set('lng', initialLocation.longitude + '');
                searchParams.set('level', '4');

                setSearchParams(searchParams, { replace: true });
              }}
            />
          )}
          <Map
            center={{ lat: location.latitude, lng: location.longitude }}
            style={{ width: '100%', height: '100%', marginTop: '-70px' }}
            level={level}
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
                searchParams.set('lat', cluster.getCenter().getLat() + '');
                searchParams.set('lng', cluster.getCenter().getLng() + '');
                searchParams.set('level', '2');
                setSearchParams(searchParams, { replace: true });
              }}
              styles={[
                {
                  width: '90px',
                  height: '42px',
                  background: 'url(/icons/markerCluster.svg) no-repeat center center',
                  padding: '2px 0 10px 10px',
                  color: 'black',
                  fontWeight: '500',
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
                    searchParams.set('lat', pickle.latitude + '');
                    searchParams.set('lng', pickle.longitude + '');
                    searchParams.set('level', '2');
                    setSearchParams(searchParams, { replace: true });
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
                      width: 90,
                      height: 42,
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

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 17px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #d0d0d0;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:focus {
    border-bottom-color: #045905;
  }
  ::placeholder {
    color: var(--Input-Text, #bababa);
  }
`;
const SearchButton = styled.img`
  position: absolute;
  right: 35px;
  top: 13px;
  cursor: pointer;
`;

const JusoOptions = styled.div`
  width: 100%;
  position: absolute;
  top: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0 17px;
`;

const JusoOption = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  padding: 10px;
  border: 1px solid #f1f1f1;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: black;
  span {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: gray;
  }
`;
