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
  canceledAt: string | null;
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
  accounts: Account[];
}

export interface Account {
  accountId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  joinedAt: string;
}
