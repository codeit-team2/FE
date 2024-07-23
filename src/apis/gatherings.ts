import { instance } from '@/lib/axios';

import { GatheringsParams } from '@/types/gatherings';

// // export const getGatheringsList = async (value) => {
// //   const res = await instance.get(
// //     '/gatherings/info?mainCategory={모임 상위 카테고리}&subCategory={모임 하위 카테고리}&location={장소}&datetime={모임 날짜}&page={페이지}&size={한 페이지에 출력할 개수}&sortBy={정렬 기준}&sortOrder={오름차순/내림차순}',
// //     { params: value },
// //   );
// //   return res.data;
// // };

// export const postGatherings = async (value) => {
//   const res = await instance.post('/gatherings', value);
//   return res.data;
// };

export const getGatherings = async (gatheringId: number) => {
  const res = await instance.get(`/gatherings/${gatheringId}`);
  return res.data;
};

// export const getParticipantsList = async (gatheringId: number, value) => {
//   const res = await instance.get(`/gatherings/${gatheringId}/participants`, { params: value });
//   return res.data;
// };

export const postGatherings = async (value: FormData) => {
  const res = await instance.post('/gatherings', value);
  return res;
};

export const getGatheringsMine = async (value: GatheringsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/gatherings/mine?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return res.data;
};

export const getGatheringsJoined = async (value: GatheringsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/gatherings/joined?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
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
