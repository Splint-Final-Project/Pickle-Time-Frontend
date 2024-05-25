import { useState, useEffect } from 'react';

interface Geolocation {
  latitude: number;
  longitude: number;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const useGeolocation = (options?: GeolocationOptions) => {
  const [location, setLocation] = useState<Geolocation | null>(null);
  const [error, setError] = useState<string>('');

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};
