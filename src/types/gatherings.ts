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

export interface GetGatheringsQuery {
  mainCategoryName: string;
  subCategoryName: string;
  sortBy: string;
  sortOrder: string;
  size: string;
}

export interface Participant {
  gatheringId: number;
  participantInfos: Account[];
}

export interface Account {
  accountId: number;
  email: string | null;
  nickname: string;
  profileImageUrl: string;
  joinedAt: string;
}

export interface GatheringsParams {
  page: number;
  size: number;
  sortBy: 'dateTime' | 'participantCount' | 'joinedAt';
  sortOrder: 'asc' | 'desc';
}

export interface PutGatherings {
  gatheringId: number;
  value: FormData;
}
