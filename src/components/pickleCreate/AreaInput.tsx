import { useEffect, useState } from 'react';
import { JusoOption, InputField, LabelText, SearchButton, InputConstraint } from './CreatePicklePageStyled';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function AreaInput({ hook }: { hook: any }) {
  const {
    place,
    address,
    detailedAddress,
    longitude,
    latitude,
    setPlace,
    setAddress,
    setLatitude,
    setLongitude,
    setAreaCode,
    setDetailedAddress,
  } = hook();

  const [jusoSearch, setJusoSearch] = useState('');
  const [jusoList, setJusoList] = useState<any[] | null>(null);
  const [selectedJuso, setSelectedJuso] = useState<any | null>(null);
  const [noResult, setNoResult] = useState(false);
  const geocoder = new kakao.maps.services.Geocoder();
  const ps = new kakao.maps.services.Places();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isFormValid, setIsFormValid] = useState(false);

  async function handleJusoSearch() {
    setNoResult(false);
    setSelectedJuso(null);
    if (!jusoSearch) return;
    ps.keywordSearch(jusoSearch, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setJusoList(data?.slice(0, 5) || []);
      } else {
        setNoResult(true);
      }
    });
  }

  useEffect(() => {
    if (selectedJuso) {
      setDetailedAddress('');
      setJusoList(null);
      setJusoSearch(selectedJuso.place_name);
      setCenter({
        lat: selectedJuso.y,
        lng: selectedJuso.x,
      });
      setPlace(selectedJuso.place_name);
      setAddress(selectedJuso.road_address_name);
      setLatitude(selectedJuso.y);
      setLongitude(selectedJuso.x);
      geocoder.addressSearch(selectedJuso.road_address_name, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setAreaCode(Number(result[0].address.b_code));
        } else {
          alert('주소를 찾을 수 없습니다. 관리자 문의.');
        }
      });
    }
  }, [selectedJuso]);

  useEffect(() => {
    if (address && place) {
      setJusoSearch(place);
      setCenter({
        lat: latitude,
        lng: longitude,
      });
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setAreaCode(Number(result[0].address.b_code));
        } else {
          alert('주소를 찾을 수 없습니다. 관리자 문의.');
        }
      });
    }
  }, []);

  return (
    <>
      <LabelText htmlFor="juso">활동할 장소를 검색해 주세요</LabelText>
      <InputField
        type="text"
        id="juso"
        name="jusoSearch"
        placeholder="주소, 상호명, 키워드로 검색"
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

      {noResult ? (
        <InputConstraint>검색 결과가 없습니다</InputConstraint>
      ) : jusoList ? (
        jusoList.map((juso, i) => (
          <JusoOption key={i} onClick={() => setSelectedJuso(juso)}>
            {juso.place_name}
            <span>{juso.road_address_name}</span>
          </JusoOption>
        ))
      ) : (
        <InputConstraint>검색 후 지도에서 위치를 확인하세요</InputConstraint>
      )}
      {address && (
        <>
          <Map
            id="jusoSelectMap"
            center={{
              lat: center.lat,
              lng: center.lng,
            }}
            style={{
              width: '100%',
              height: '286px',
              margin: '15px 0',
            }}
            level={3}
          >
            <MapMarker
              position={{
                lat: center.lat,
                lng: center.lng,
              }}
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
          </Map>
          <InputField
            type="text"
            id="detailedAddress"
            placeholder="(예시) 위워크 건물 10층"
            value={detailedAddress}
            onChange={e => setDetailedAddress(e.target.value)}
          />
          <InputConstraint>상세 주소를 입력해 주세요(선택)</InputConstraint>
        </>
      )}
    </>
  );
}
