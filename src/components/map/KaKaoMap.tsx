import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function KaKaoMap() {
  return (
    <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '100%', height: '400px' }} level={3}>
      <MapMarker position={{ lat: 33.450701, lng: 126.570667 }}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
