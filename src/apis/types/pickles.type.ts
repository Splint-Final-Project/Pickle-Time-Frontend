export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface When {
  times: string[];
}

export type CreatePickleData = {
  title: string;
  capacity: number;
  deadLine: string;
  where: string;
  when: When;
  category: string;
  explanation: string;
  latitude: number;
  longitude: number;
};

interface Participant {
  isLeader: boolean;
  user: string;
  _id: string;
}

export interface WholePickle {
  capacity: number;
  cost: number;
  deadLine: string;
  id: string;
  latitude: number;
  longtitude: number;
  participants: Participant[];
  title: string;
  when: When;
  where: string;
}

export interface CreateReviewData {
  star: number;
  reviewText?: string;
}
