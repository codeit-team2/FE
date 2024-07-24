export interface ReviewsParams {
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
    profileImageUrl: string;
  };
  gatheringInfo: {
    gatheringId: number;
    gatheringImageUrl: string;
    location: string;
    mainCategoryName: string;
    subCategoryName: string;
  };
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
  value: DeleteReviewsValue;
}

interface DeleteReviewsValue {
  email: string;
}
