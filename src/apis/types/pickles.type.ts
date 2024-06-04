export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface whenData {
  summary: string;
  times: string[];
}

export type CreatePickleData = {
  title: string;
  capacity: number;
  deadLine: string;
  where: string;
  when: whenData;
  content: string;
  explanation: string;
  latitude: number;
  longitude: number;
};
