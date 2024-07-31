import React from 'react';

import Loading from '@/components/Loading';
import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { useGetGatheringsMine } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

export default function Mine() {
  // getGatheringsMine api
  const {
    data: gatheringsData,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useGetGatheringsMine(5, 'dateTime', 'asc');

  return (
    <div className="flex flex-col gap-20 pb-50">
      {gatheringsData ? (
        gatheringsData.pages.map((datas) =>
          datas.map((data: Gathering, index: number) => (
            <>
              <MyCard key={index} data={data} type="club" />
            </>
          )),
        )
      ) : (
        <>{isPending ? <Loading width="300" height="300" /> : <NotCard type="mine" />}</>
      )}
      {hasNextPage && <button onClick={() => fetchNextPage()}>더보기</button>}
    </div>
  );
}
