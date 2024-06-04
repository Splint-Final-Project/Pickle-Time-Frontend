export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type CreatePickleData = {
  latitude: number;
  longitude: number;
  pickleType: string;
  title: string;
  startDate: string;
  endDate: string;
  price: number;
  auth: number;
  category: string;
  capacity: number;
  content: string;
};
