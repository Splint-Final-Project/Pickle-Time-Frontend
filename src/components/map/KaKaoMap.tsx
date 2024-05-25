import { useGeolocation } from '@/hooks/useGeolocation';
import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerData from '../../mocks/markerData';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function KaKaoMap() {
  const { location, error } = useGeolocation(geolocationOptions);

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <div>
      {location ? (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '100%', height: '400px' }}
          level={3}
        >
          <MapMarker position={{ lat: location.latitude, lng: location.longitude }}>
            <div style={{ color: '#000' }}>현재 위치</div>
          </MapMarker>
          {markerData.map(marker => (
            <MapMarker key={marker.id} position={{ lat: marker.latitude, lng: marker.longitude }} title={marker.name}>
              <div style={{ color: '#000' }}>{marker.name}</div>
            </MapMarker>
          ))}
        </Map>
      ) : (
        <div>지도 로딩중</div>
      )}
    </div>
  );
}
