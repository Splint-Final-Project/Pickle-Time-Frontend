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
      <form onSubmit={() => navigate('/pickle-create-payment')}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />

        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" value={capacity} onChange={e => setCapacity(Number(e.target.value))} />

        <label htmlFor="cost">Cost:</label>
        <input type="number" id="cost" value={cost} onChange={e => setCost(Number(e.target.value))} />
        {/* <label htmlFor="deadline">Deadline:</label>
      <input type="date" id="deadline" value={deadLine} onChange={(e) => setDeadLine(e.target.value)} /> */}

        <label htmlFor="where">Where:</label>
        <input type="text" id="where" value={where} onChange={e => setWhere(e.target.value)} />

        {/* <label htmlFor="when">When:</label>
      <input type="datetime-local" id="when" value={when} onChange={(e) => setWhen(e.target.value)} /> */}

        <label htmlFor="category">Category:</label>
        <textarea id="category" value={category} onChange={e => setCategory(e.target.value)} />

        <label htmlFor="explanation">Explanation:</label>
        <textarea id="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />

        {/* <label htmlFor="viewCount">View Count:</label>
        <input type="number" id="viewCount" value={viewCount} onChange={e => setViewCount(Number(e.target.value))} /> */}

        <label htmlFor="latitude">Latitude:</label>
        <input type="number" id="latitude" value={latitude} onChange={e => setLatitude(Number(e.target.value))} />

        <label htmlFor="longitude">Longitude:</label>
        <input type="number" id="longitude" value={longitude} onChange={e => setLongitude(Number(e.target.value))} />

        <button type="submit">Create Pickle</button>
      </form>
    </div>
  );
}
