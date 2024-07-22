import { instance } from '@/lib/axios';

import { Gathering } from '@/types/gathering';

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

// // export const getGatheringsJoined = async (value) => {
// //   const res = await instance.get(
// //     '/gatherings/joined?page={페이지}&size={한 페이지에 출력할 개수}&sortBy={정렬 기준}&sortOrder={오름차순/내림차순}',
// //     { params: value },
// //   );
// //   return res.data;
// // };
// https://hobbyzone.p-e.kr/gatherings?page=0&size=5&sortBy=dateTime&sortOrder=asc
// export const getGatherings = async (
//   page: string = '0',
//   size: string = '5',
//   sortBy: string = 'dateTime',
//   sortOrder: string = 'asc',
// ) => {
//   const res = await instance.get(
//     `/gatherings?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
//   );
//   return res.data;
// };
export const getGatherings = async (
  page: number,
  size: string,
  sortBy: string,
  sortOrder: string,
  mainCategory: string,
  subCategory: string,
) => {
  // page는 & params로 안 빠진 상태.
  const res = await instance.get(`/gatherings?mainCategory=${mainCategory}`, {
    params: { subCategory, pageParam: page, size, sortBy, sortOrder },
  });
  return res.data;
};
// 전체에 대한 값은 어떻게 보내야하는지? 전체 안되고 특정 헬스, 러닝은 가능함.
export const getGatheringsTest = async (
  page: number,
  subCategoryName: string = '러닝',
  mainCategoryName: string = '운동',
) => {
  // %EC%9A%B4%EB%8F%99
  // mainCategoryName=%EC%9A%B4%EB%8F%99&subCategoryName=%EB%9F%AC%EB%8B%9D&page=0&size=5&sortBy=dateTime&sortOrder=asc
  // console.log(page);
  const res = await instance.get(`/gatherings?mainCategoryName=${mainCategoryName}`, {
    // params: { page, subCategoryName, sortBy, sortOrder, size },
    params: { page, subCategoryName },
  });
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

export const postGatheringsJoin = async (gatheringId: number, value: string) => {
  const res = await instance.post(`/gatherings/${gatheringId}/join`, value);
  return res.data;
};

// export const postGatheringsLeave = async (gatheringId: number, value) => {
//   const res = await instance.post(`/gatherings/${gatheringId}/leave`, value);
//   return res.data;
// };
