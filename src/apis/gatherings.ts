import { instance } from '@/lib/axios';

import { GatheringsParams, PutGatherings } from '@/types/gatherings';

// 전체에 대한 값은 어떻게 보내야하는지? 전체 안되고 특정 헬스, 러닝은 가능함.
export const getGatherings = async (
  page: number,
  mainCategoryName: string,
  subCategoryName: string,
  sortOrder: string = 'asc',
  location: string | null,
  dateTime: string | undefined,
  size: number = 5,
) => {
  const res = await instance.get(`/gatherings?`, {
    params: {
      page,
      mainCategoryName,
      subCategoryName,
      sortOrder,
      location,
      dateTime,
      size,
    },
  });
  return res.data;
};

export const getDetailGatherings = async (gatheringId: number) => {
  const res = await instance.get(`/gatherings/${gatheringId}`);
  return res.data;
};

export const postGatherings = async (value: FormData) => {
  const res = await instance.post('/gatherings', value, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res;
};

export const putGatherings = async ({ gatheringId, value }: PutGatherings) => {
  const res = await instance.put(`/gatherings/${gatheringId}`, value, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res;
};

export const getGatheringsMine = async (
  page: number,
  size: number,
  sortBy: 'dateTime',
  sortOrder: 'asc' | 'desc',
) => {
  const res = await instance.get(`/gatherings/mine`, { params: { page, size, sortBy, sortOrder } });
  return res.data;
};

export const getGatheringsJoined = async (
  page: number,
  size: number,
  sortBy: 'dateTime',
  sortOrder: 'asc' | 'desc',
) => {
  const res = await instance.get(`/gatherings/joined`, {
    params: { page, size, sortBy, sortOrder },
  });
  return res.data;
};

export const postGatheringsJoin = async (gatheringId: number) => {
  const res = await instance.post(`/gatherings/${gatheringId}/join`);
  return res.data;
};

export const postGatheringsLeave = async (gatheringId: number) => {
  const res = await instance.post(`/gatherings/${gatheringId}/leave`);
  return res.data;
};

export const deleteGatherings = async (gatheringId: number) => {
  const res = await instance.delete(`/gatherings/${gatheringId}/cancel`);
  return res.data;
};

export const getGatheringsParticipant = async (gatheringId: number, value: GatheringsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(`/gatherings/${gatheringId}/participants`, {
    params: { page, size, sortBy, sortOrder },
  });
  return res.data;
};
