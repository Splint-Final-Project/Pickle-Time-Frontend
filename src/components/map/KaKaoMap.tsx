import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerData, { MarkerData } from '../../mocks/markerData';
// import image from '/images/temporaryMarkerImage.png';
import image from '/images/hing.png';
import { useGetInfinitePickles, useGetNearbyPickles } from '@/hooks/query/pickles';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function KaKaoMap() {
  const { location, error } = useGeolocation(geolocationOptions);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  // const [isOpen, setIsOpen] = useState(false);
  const [sortedMarkers, setSortedMarkers] = useState<MarkerData[]>([]);

  //server state
  // const { data } = useGetInfinitePickles();
  const { data } = useGetNearbyPickles(location);
  console.log(data);

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const moveToCurrentLocation = () => {
    if (location && map) {
      const center = new kakao.maps.LatLng(location.latitude, location.longitude);
      map.setCenter(center);
    }
  };

  const handleMarkerClick = (clickedMarker: MarkerData) => {
    const distances = markerData.map(marker => {
      const distance = Math.sqrt(
        Math.pow(clickedMarker.latitude - marker.latitude, 2) + Math.pow(clickedMarker.longitude - marker.longitude, 2),
      );
      return { ...marker, distance };
    });

    const sorted = distances.sort((a, b) => a.distance - b.distance);
    setSortedMarkers(sorted);
  };
  console.log(location);
  return (
    <div>
      {location ? (
        <>
          <Map
            center={{ lat: location.latitude, lng: location.longitude }}
            style={{ width: '100%', height: '400px' }}
            level={3}
            onCreate={setMap}
          >
            <MapMarker
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => handleMarkerClick({ id: 0, name: '현재 위치', ...location })} // 현재 위치 클릭 시 현재 위치 정보를 가지고 있는 마커를 클릭한 것으로 처리
            >
              <div style={{ color: '#000' }}>현재 위치</div>
            </MapMarker>
            {markerData.map(marker => (
              <MapMarker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                title={marker.name}
                image={{ src: image, size: { width: 30, height: 30 } }}
                onClick={() => handleMarkerClick(marker)} // 마커 클릭 이벤트 추가
              >
                {/* name을 적으면 Map의 center에서 오류가 발생함, name이 적용할 경우 위에 있는 useEffect 코드에 있는 주석 부분으로 수정해야함 */}
                {/* <div style={{ color: '#000' }}>{marker.name}</div> */}
              </MapMarker>
            ))}
          </Map>
          <button style={{ border: '1px solid black' }} onClick={moveToCurrentLocation}>
            현재 위치로 이동
          </button>
          <div>
            <h3>가까운 순으로 정렬된 마커 리스트</h3>
            <ul>
              {sortedMarkers.map((marker, index) => (
                <li key={marker.id}>
                  {index + 1}. {marker.name} - {marker.distance?.toFixed(2)} km
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>지도 로딩중</div>
      )}
    </div>
  );
}
