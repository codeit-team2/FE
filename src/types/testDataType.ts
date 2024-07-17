//Detail

export interface Gathering {
  gatheringId: number;
  location: string;
  mainCategory: string;
  subCategory: string;
  name: string;
  dateTime: string;
  registrationEnd?: string;
  participantCount: number;
  capacity: number;
  gatheringImageUrl: string;
  createdAt: string;
  canceledAt: string;
}

export interface Participant {
  gatheringId: number;
  accounts: Account[];
}

export interface Account {
  accountId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  joinedAt: string;
}

export interface ReviewData {
  star: number;
  comment: string;
  profileImage: string;
  nickname: string;
  date: string;
}

//Review

export interface ExerciseReview {
  star: number;
  comment: string;
  profileImage: string;
  cardImage: string;
  nickname: string;
  date: string;
  place: string;
  group: string;
}

export interface CategoryReviews {
  Exercise: ExerciseReview[];
  Activity: ExerciseReview[]; // Activity 데이터가 ExerciseReview와 동일한 구조라고 가정합니다.
  Learning: ExerciseReview[]; // Learning 데이터가 ExerciseReview와 동일한 구조라고 가정합니다.
  Culture: ExerciseReview[]; // Culture 데이터가 ExerciseReview와 동일한 구조라고 가정합니다.
}

export interface ReviewCard {
  categories: CategoryReviews;
}
