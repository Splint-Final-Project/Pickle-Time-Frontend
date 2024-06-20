import AroundPickleCard from '@/components/picklecard/AroundPickleCard';
import { useMyFavoritePickleIds } from '@/hooks/query/like';
import { useGetNearbyPickles } from '@/hooks/query/pickles';
import { useGeolocation } from '@/hooks/useGeolocation';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * 내 주변 페이지
 */

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 4,
};

export default function MapSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = {
    latitude: Number(searchParams.get('lat')),
    longitude: Number(searchParams.get('lng')),
  };
  const level = Number(searchParams.get('level'));

  const { location: initialLocation, error } = useGeolocation(geolocationOptions);

  const [activeTabs, setActiveTabs] = useState<Set<string>>(new Set([]));
  const tabs = ['찜', '운동', '취미', '스터디'];
  const imgsrc = ['/icons/zzim.svg', '/images/category1.svg', '/images/category2.svg', '/images/category3.svg'];

  const [jusoSearch, setJusoSearch] = useState('');
  const [jusoList, setJusoList] = useState<any[] | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const { data } = useGetNearbyPickles(location, level);
  const { data: favoriteIds } = useMyFavoritePickleIds();
  let nearbyPickle: any[] = data?.data || [];
  if (activeTabs.has('찜')) {
    console.log('찜');
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
      <Title>
        <img
          src="/icons/back.svg"
          alt="back"
          onClick={() => {
            navigate('/');
          }}
        />
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
            style={{ width: '100%', height: 'calc(100% + 70px)', marginTop: '-140px' }}
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

export const Title = styled.div`
  margin-top: 90px;
  padding: 0 17px;
  display: flex;
  align-items: center;
  gap: 22px;
  color: var(--Basic, #181f29);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  img {
    height: 16px;
    cursor: pointer;
  }
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
  margin-top: 32px;
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0 17px;
  align-items: center;
  margin: 13px 0 15px;
`;

const Tab = styled.div<{ $active: boolean }>`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* 인터넷익스플로러 */
  user-select: none;
  font-size: 1.4rem;
  display: inline-flex;
  align-items: center;
  border-radius: 18px;
  background: ${({ $active }) => ($active ? '#000' : '#f1f1f1')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--Sub-Text, var(--Tab-Bar-Color-2, #8b8d94))')};
  padding: 0.7rem 1.4rem;
  transition:
    background-color 0.3s,
    color 0.3s;

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
    margin-right: 3px;
    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
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
