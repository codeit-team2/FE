//Detail

export interface User {
  profileImage: string;
  nickname: string;
}

export interface Activity {
  category: string;
  place: string;
  date: string;
  time: string;
  title: string;
  member: number;
  imageUrl: string;
  deadline: string;
  confirmed: boolean;
  users: User[];
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
