import React, { useEffect, useState } from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { useGetGatheringsMine } from '@/hooks/useGatherings';

import { Gathering, GatheringsMine } from '@/types/gatherings';

export default function Club() {
  const [page, setPage] = useState<number>(0);

  const value: GatheringsMine = {
    page: page,
    size: 5,
    sortBy: 'dateTime',
    sortOrder: 'asc',
  };

  const { data, error, isLoading } = useGetGatheringsMine(value);
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col gap-20 pb-50">
      {/* 내가 만든 모임만 뜨도록 데이터 수정 필요 */}
      {data ? (
        <>
          {data.map((data: Gathering, index: number) => (
            <MyCard type="club" key={index} data={data} />
          ))}
          <button onClick={() => setPage(page + 1)}>더보기</button>
        </>
      ) : (
        <NotCard />
      )}
    </div>
  );
}
