import React from 'react';

import Loading from '@/components/Loading';
import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { isDateBeforeToday } from '@/lib/utils';

import { useGetGatheringsJoined } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

export default function Joined() {
  const {
    data: gatheringsData,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useGetGatheringsJoined(3, 'dateTime', 'asc');

  return (
    <div>
      <div className="flex flex-col gap-20 pb-50">
        {gatheringsData ? (
          gatheringsData.pages.map((datas) =>
            datas.map(
              (data: Gathering, index: number) =>
                !isDateBeforeToday({ date: data.dateTime }) && <MyCard key={index} data={data} />,
            ),
          )
        ) : (
          <>{isPending ? <Loading width="300" height="300" /> : <NotCard type="join" />}</>
        )}
        {hasNextPage && <button onClick={() => fetchNextPage()}>더보기</button>}
      </div>
    </div>
  );
}
