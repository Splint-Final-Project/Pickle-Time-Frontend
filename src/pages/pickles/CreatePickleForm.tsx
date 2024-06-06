import usePickleCreation from '@/hooks/zustand/usePickleCreation';
import React from 'react';
import axios from 'axios';
import client from '@/apis/axios';
import { useNavigate } from 'react-router-dom';

export default function NewPickle() {
  const {
    title,
    capacity,
    cost,
    deadLine,
    where,
    when,
    content,
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
    setContent,
    setExplanation,
    setViewCount,
    setLatitude,
    setLongitude,
  } = usePickleCreation();
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={() => navigate('/create-pickle-payment')}>
        {/* <label htmlFor="deadline">Deadline:</label>
      <input type="date" id="deadline" value={deadLine} onChange={(e) => setDeadLine(e.target.value)} /> */}

        <label htmlFor="where">Where:</label>
        <input type="text" id="where" value={where} onChange={e => setWhere(e.target.value)} />

        {/* <label htmlFor="when">When:</label>
      <input type="datetime-local" id="when" value={when} onChange={(e) => setWhen(e.target.value)} /> */}

        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} />

        <label htmlFor="explanation">Explanation:</label>
        <textarea id="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />

        <label htmlFor="viewCount">View Count:</label>
        <input type="number" id="viewCount" value={viewCount} onChange={e => setViewCount(Number(e.target.value))} />

        <label htmlFor="latitude">Latitude:</label>
        <input type="number" id="latitude" value={latitude} onChange={e => setLatitude(Number(e.target.value))} />

        <label htmlFor="longitude">Longitude:</label>
        <input type="number" id="longitude" value={longitude} onChange={e => setLongitude(Number(e.target.value))} />

        <button type="submit">Create Pickle</button>
      </form>
    </div>
  );
}
