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

//Card

export interface TestCardData {
  category: string; // 카테고리는 러닝 등 문자열 형태
  place: string; // 장소도 문자열
  date: string; // 날짜는 ISO 형식의 문자열
  title: string; // 이벤트 제목도 문자열
  member: number; // 멤버 수는 숫자
  imageUrl: string; // 이미지 URL도 문자열
  deadline: string; // 마감 정보도 문자열
  confirmed: boolean; // 확인 여부는 불리언
  review: boolean; // 리뷰 여부도 불리언
}
