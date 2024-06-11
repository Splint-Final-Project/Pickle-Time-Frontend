import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React from 'react';
import axios from 'axios';
import client from '@/apis/axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePickle2() {
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
      <form onSubmit={() => navigate('/pickle-create-3')}>
        <label htmlFor="category">Category:</label>
        <textarea id="category" value={category} onChange={e => setCategory(e.target.value)} />

        <span>TODO: 일정 입력 ()</span>

        <label htmlFor="cost">Cost:</label>
        <input type="number" id="cost" value={cost} onChange={e => setCost(Number(e.target.value))} />

        <button type="submit">다음 단계로 넘어가기</button>
      </form>
    </div>
  );
}
