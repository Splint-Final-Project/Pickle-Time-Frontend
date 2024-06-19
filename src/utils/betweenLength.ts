export default function betweenLength(detination: { latitude: number; longitude: number }): Promise<number> {
  const REDIUS = 6371;
  const toRadian = Math.PI / 180;

  return new Promise((reslove, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;

        const latitudeValue = Math.abs(currentLatitude - detination.latitude) * toRadian;
        const longitudeValue = Math.abs(currentLongitude - detination.longitude) * toRadian;

        const latitudeSin = Math.sin(latitudeValue / 2);
        const longitudeSin = Math.sin(longitudeValue / 2);

        const rootValue = Math.sqrt(
          latitudeSin ** 2 +
            Math.cos(currentLatitude * toRadian) * Math.cos(detination.latitude * toRadian) * longitudeSin ** 2,
        );
        const distance = Math.round(2 * REDIUS * Math.asin(rootValue));
        reslove(distance);
      },
      error => {
        reject(error);
      },
    );
  });
}
