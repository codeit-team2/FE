import React, { useEffect, useState } from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { useGetGatheringsJoined } from '@/hooks/useGatherings';

import { Gathering, GatheringsParams } from '@/types/gatherings';

export default function Joined() {
  const [page, setPage] = useState<number>(0);
  const [cardItems, setCardItems] = useState<Gathering[]>([]);

  // getGatheringsJoined api 호출
  const value: GatheringsParams = {
    page: page,
    size: 5,
    sortBy: 'dateTime',
    sortOrder: 'asc',
  };

  const { data } = useGetGatheringsJoined(value);
  useEffect(() => {
    data && setCardItems((prev) => [...prev, ...data]);
  }, [data]);

  return (
    <div>
      <div className="flex flex-col gap-20 pb-50">
        {cardItems.length > 0 ? (
          <>
            {cardItems.map((data, index) => (
              <MyCard key={index} data={data} />
            ))}
            <button onClick={() => setPage(page + 1)}>더보기</button>
          </>
        ) : (
          <NotCard />
        )}
      </div>
    </div>
  );
}
