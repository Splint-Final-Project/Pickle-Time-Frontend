import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React from 'react';
import axios from 'axios';
import client from '@/apis/axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePickle3() {
  const {
    title,
    capacity,
    cost,
    deadLine,
    where,
    when,
    category,
    explanation,
    viewCount,
    latitude,
    longitude,
    setTitle,
    setCapacity,
    setCost,
    setDeadLine,
    setWhere,
    setWhen,
    setCategory,
    setExplanation,
    setViewCount,
    setLatitude,
    setLongitude,
  } = usePickleCreation();
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={() => navigate('/pickle-create-4')}>
        <span>TODO: 대표이미지 설정. ai생성?</span>

        <label htmlFor="explanation">Explanation: ai로 생성?</label>
        <textarea id="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />

        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" value={capacity} onChange={e => setCapacity(Number(e.target.value))} />
        <span>TODO: 피클의 목표 설정, placeholder를 ai로 생성?</span>
        <button type="submit">다음 단계로 넘어가기</button>
      </form>
    </div>
  );
}
