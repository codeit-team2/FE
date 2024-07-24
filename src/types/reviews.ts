export interface ReviewsParams {
  mainCategoryName?: string;
  subCategoryName?: string;
  page: number;
  size: number;
  sortBy: 'score';
  sortOrder: 'asc' | 'desc';
}

export interface Reviews {
  reviewId: number;
  score: number;
  comment: string;
  createdAt: string;
  accountInfo: {
    nickname: string;
    profileImageUrl: string | null;
  };
  gatheringInfo: {
    gatheringId: number;
    gatheringImageUrl: string;
    location: string;
    mainCategoryName: string;
    subCategoryName: string;
  };
}

export interface Scores {
  averageScore: number;
  scoreOneCount: number;
  scoreTwoCount: number;
  scoreThreeCount: number;
  scoreFourCount: number;
  scoreFiveCount: number;
}

export interface ReviewData {
  scoreInfo: Scores;
  reviewInfos: Reviews[];
}

export interface PostReviews {
  gatheringId: number;
  score: number;
  comment: string;
}

export interface PutReviews {
  reviewId: number;
  value: PutReviewsValue;
}

interface PutReviewsValue {
  score: number;
  comment: string;
}

export interface DeleteReviews {
  reviewId: number;
}
