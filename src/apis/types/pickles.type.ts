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

export interface DetailPickle {
  capacity: number;
  category: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
  deadLine: string;
  explanation: string;
  isCancelled: boolean;
  latitude: number;
  longtitude: number;
  participantNumber: number;
  title: string;
  viewCount: number;
  when: When;
  where: string;
  id: string;
}

export interface CreateReviewData {
  star: number;
  reviewText?: string;
}
