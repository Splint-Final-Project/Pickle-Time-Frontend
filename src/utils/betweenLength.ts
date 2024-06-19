export default function betweenLength(
  current: { latitude: number; longitude: number },
  detination: { latitude: number; longitude: number },
) {
  const REDIUS = 6371;
  const toRadian = Math.PI / 180;

  const latitudeValue = Math.abs(current.latitude - detination.latitude) * toRadian;
  const longitudeValue = Math.abs(current.longitude - detination.longitude) * toRadian;

  const latitudeSin = Math.sin(latitudeValue / 2);
  const logitudeSin = Math.sin(longitudeValue / 2);

  const rootValue = Math.sqrt(
    latitudeSin ** 2 +
      Math.cos(current.latitude * toRadian) * Math.cos(detination.latitude * toRadian) * logitudeSin ** 2,
  );
  return Math.round(2 * REDIUS * Math.asin(rootValue));
}
