import { useGeolocation } from '@/hooks/useGeolocation';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerData from '../../mocks/markerData';
// import image from '/public/images/temporaryMarkerImage.png';
import image from '/public/images/hing.png';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function KaKaoMap() {
  const { location, error } = useGeolocation(geolocationOptions);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location) {
      setIsLoaded(true);
      // if (map) {
      //   const center = new kakao.maps.LatLng(location.latitude, location.longitude);
      //   map.setCenter(center);
      // }
    }
    // }, [location,map]);
  }, [location]);

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const moveToCurrentLocation = () => {
    if (location && map) {
      const center = new kakao.maps.LatLng(location.latitude, location.longitude);
      map.setCenter(center);
    }
  };

  return (
    <div>
      {isLoaded ? (
        <>
          <Map
            center={{ lat: location.latitude, lng: location.longitude }}
            style={{ width: '100%', height: '400px' }}
            level={3}
            onCreate={setMap}
          >
            <MapMarker position={{ lat: location.latitude, lng: location.longitude }}>
              <div style={{ color: '#000' }}>현재 위치</div>
            </MapMarker>
            {markerData.map(marker => (
              <MapMarker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                title={marker.name}
                image={{ src: image, size: { width: 30, height: 30 } }}
              >
                {/* name을 적으면 Map의 center에서 오류가 발생함, name이 적용할 경우 위에 있는 useEffect 코드에 있는 주석 부분으로 수정해야함 */}
                {/* <div style={{ color: '#000' }}>{marker.name}</div> */}
              </MapMarker>
            ))}
          </Map>
          <button style={{ border: '1px solid black' }} onClick={moveToCurrentLocation}>
            현재 위치로 이동
          </button>
        </>
      ) : (
        <div>지도 로딩중</div>
      )}
    </div>
  );
}
