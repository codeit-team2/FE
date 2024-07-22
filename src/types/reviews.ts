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
