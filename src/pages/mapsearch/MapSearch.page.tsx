import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';

import AroundPickleCard from '@/components/picklecard/AroundPickleCard';
import BackButton from '@/components/common/button/BackButton';
import { showErrorToast } from '@/components/common/Toast';
import { useMyFavoritePickleIds } from '@/hooks/query/like';
import { useGetNearbyPickles } from '@/hooks/query/pickles';
import { useGeolocation } from '@/hooks/useGeolocation';
import EmptyDataMessage from '@/components/common/EmptyDataMessage';

/**
 * 내 주변 페이지
 */

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 4 * 1000,
};

export default function MapSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabs, setActiveTabs] = useState<Set<string>>(new Set([]));
  const [jusoSearch, setJusoSearch] = useState('');
  const [jusoList, setJusoList] = useState<any[] | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const tabs = ['찜', '운동', '취미', '스터디'];
  const imgsrc = ['/icons/zzim.svg', '/images/category1.svg', '/images/category2.svg', '/images/category3.svg'];

  const level = Number(searchParams.get('level'));
  const location = {
    latitude: Number(searchParams.get('lat')),
    longitude: Number(searchParams.get('lng')),
  };

  const { location: initialLocation, error } = useGeolocation(geolocationOptions);
  const { data } = useGetNearbyPickles(location, level);
  const { data: favoriteIds } = useMyFavoritePickleIds();

  let nearbyPickle: any[] = data?.data || [];

  if (activeTabs.has('찜')) {
    nearbyPickle = nearbyPickle.filter((pickle: any) => {
      return favoriteIds?.data?.find((favoriteId: any) => favoriteId === pickle.id);
    });
    nearbyPickle = nearbyPickle.filter((pickle: any) => {
      if (activeTabs.size === 1) return true;
      return activeTabs.has(pickle.category);
    });
  } else {
    nearbyPickle = nearbyPickle.filter((pickle: any) => {
      if (activeTabs.size === 0) return true;
      return activeTabs.has(pickle.category);
    });
  }

  async function handleJusoSearch() {
    if (!jusoSearch) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(jusoSearch, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setJusoList(data?.slice(0, 5) || []);
      } else {
        showErrorToast('검색 결과가 없어요!');
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
      <Title>
        <BackButton />
        <div>지도로 탐색하기</div>
      </Title>
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
          src="/icons/magnifier.svg"
          alt="search"
          onClick={e => {
            handleJusoSearch();
          }}
        />
      </InputContainer>
      <TabWrapper>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            $active={activeTabs.has(tab)}
            onClick={() => {
              const newTabs = new Set(activeTabs);
              if (newTabs.has(tab)) {
                newTabs.delete(tab);
              } else {
                newTabs.add(tab);
              }
              setActiveTabs(newTabs);
            }}
          >
            {imgsrc[index] && (
              <div>
                <img src={imgsrc[index]} alt={tab} />
              </div>
            )}
            {tab}
          </Tab>
        ))}
      </TabWrapper>

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
            style={{ width: '100%', height: 'calc(100% + 100px)', marginTop: '-150px' }}
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90px',
                  height: '42px',
                  padding: '2px 0 10px 10px',
                  background: 'url(/icons/markerCluster.svg) no-repeat center center',
                  color: 'black',
                  fontWeight: '500',
                  textAlign: 'center',
                  filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.10))',
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
                        x: 45,
                        y: 21,
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
        <EmptyDataMessage>{'지도를 로딩 중이에요!' + error}</EmptyDataMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100dvh;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;
  margin-top: 6rem;
  padding: 0 3.5rem;
  ${({ theme }) => theme.typography.header}
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  div {
    div {
      div {
        div {
          div {
            img {
              filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.1));
            }
          }
        }
      }
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 4rem;
  padding: 0 3.5rem;
  margin-top: 3.2rem;
`;

const InputField = styled.input`
  width: 100%;
  height: 4rem;
  border: none;
  border-bottom: ${({ theme }) => theme.border};
  ${({ theme }) => theme.typography.subTitle3};

  &:focus {
    border-bottom-color: #045905;
  }
  ::placeholder {
    color: ${({ theme }) => theme.color.sub};
  }
`;

const SearchButton = styled.img`
  position: absolute;
  right: 3.5rem;
  top: 1.3rem;
  cursor: pointer;
`;

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0 3.5rem;
  margin: 1.3rem 0 1.5rem;
`;

const Tab = styled.div<{ $active: boolean }>`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* 인터넷익스플로러 */
  user-select: none;

  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.4rem;
  border-radius: 1.8rem;
  background: ${({ $active }) => ($active ? '#000' : '#f1f1f1')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94))')};
  font-size: 1.4rem;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? '#000' : '#dcdcdc')};
    color: ${({ $active }) => ($active ? '#fff' : '#8b8d94')};
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    margin-right: 0.3rem;

    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

const JusoOptions = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 3.5rem;
`;

const JusoOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid #f1f1f1;
  background-color: white;
  cursor: pointer;
  color: ${({ theme }) => theme.color.black};
  ${({ theme }) => theme.typography.body1};

  &:hover {
    background-color: #f1f1f1;
  }

  span {
    ${({ theme }) => theme.typography.body2};
    line-height: normal;
    color: gray;
  }
`;

const ReCenterButton = styled.img`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;

const PickleCardContainer = styled.div`
  position: absolute;
  bottom: 10rem;
  z-index: 10;
  display: flex;
  flex-shrink: 0;
  gap: 2rem;
  width: auto;
  padding: 0 2rem;
  overflow: scroll;
`;
