import { instance } from '@/lib/axios';

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

// 전체에 대한 값은 어떻게 보내야하는지? 전체 안되고 특정 헬스, 러닝은 가능함.
export const getGatherings = async (
  page: number,
  mainCategoryName: string,
  subCategoryName: string,
  sortBy: string = 'dateTime',
  sortOrder: string = 'asc',
  location: string | null,
  size: number = 5,
) => {
  // `/gatherings?mainCategoryName=${mainCategoryName}&subCategoryName=${subCategoryName}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&location=${location}`,
  const res = await instance.get(`/gatherings?`, {
    params: { page, mainCategoryName, subCategoryName, sortBy, sortOrder, location, size },
    // params: { page },
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
  throw new Error('An error occurred!');
  return res.data;
};

// export const postGatheringsLeave = async (gatheringId: number, value) => {
//   const res = await instance.post(`/gatherings/${gatheringId}/leave`, value);
//   return res.data;
// };
