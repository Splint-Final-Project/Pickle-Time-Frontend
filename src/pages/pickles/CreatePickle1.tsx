import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React from 'react';
import axios from 'axios';
import client from '@/apis/axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePickle1() {
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
      <form onSubmit={() => navigate('/pickle-create-2')}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />

        <label htmlFor="where">Where:</label>
        <input type="text" id="where" value={where} onChange={e => setWhere(e.target.value)} />

        <button type="submit">장소 등록후 다음 단계로 넘어가기</button>
      </form>
    </div>
  );
}
