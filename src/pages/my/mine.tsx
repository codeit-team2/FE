import React, { useEffect, useState } from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { useGetGatheringsMine } from '@/hooks/useGatherings';

import { Gathering, GatheringsParams } from '@/types/gatherings';

export default function Mine() {
  const [page, setPage] = useState<number>(0);
  const [cardItems, setCardItems] = useState<Gathering[]>([]);

  // button click
  const handleButtonClick = () => {
    setPage(page + 1);
  };

  // getGatheringsMine api
  const value: GatheringsParams = {
    page: page,
    size: 5,
    sortBy: 'dateTime',
    sortOrder: 'asc',
  };

  const { data } = useGetGatheringsMine(value);
  useEffect(() => {
    data && setCardItems((prev) => [...prev, ...data]);
  }, [data]);

  return (
    <div className="flex flex-col gap-20 pb-50">
      {/* 내가 만든 모임만 뜨도록 데이터 수정 필요 */}
      {cardItems ? (
        <>
          {cardItems.map((data: Gathering, index: number) => (
            <MyCard type="club" key={index} data={data} />
          ))}
          <button onClick={() => handleButtonClick()}>더보기</button>
        </>
      ) : (
        <NotCard />
      )}
    </div>
  );
}
