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
