export interface Gathering {
  gatheringId: number;
  location: string;
  mainCategoryName: string;
  subCategoryName: string;
  name: string;
  dateTime: string;
  participantCount: number;
  capacity: number;
  gatheringImageUrl: string;
  createdAt: string;
  hasReviewed?: boolean;
  isCreator?: boolean;
  isJoiner?: boolean;
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

export interface GatheringsParams {
  page: number;
  size: number;
  sortBy: 'dateTime' | 'participantCount';
  sortOrder: 'asc' | 'desc';
}
