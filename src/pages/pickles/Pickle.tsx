import KaKaoMap from '@/components/map/KaKaoMap';
import React from 'react';

export default function Pickle() {
  // 파라미터로 받은 피클 id로 피클 정보를 가져와서 보여줌
  return (
    <div>
      <p>파라미터로 받은 피클 id로 피클 정보를 가져와서 보여줌</p>
      <KaKaoMap />
    </div>
  );
}
