import React from 'react';

import Loading from '@/components/Loading';
import GatheringReviewCard from '@/components/My/GatheringReviewCard';
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
  } = useGetGatheringsJoined(5, 'dateTime', 'asc');

  return (
    <div>
      <div className="flex flex-col gap-20 pb-50">
        {gatheringsData ? (
          gatheringsData.pages.map((datas) =>
            datas.map(
              (data: Gathering, index: number) =>
                isDateBeforeToday({ date: data.dateTime }) && data.hasReviewed ? (
                  <GatheringReviewCard key={index} gatheringId={data.gatheringId} />
                ) : (
                  <MyCard key={index} data={data} />
                ),
              hasNextPage && <button onClick={() => fetchNextPage()}>더보기</button>,
            ),
          )
        ) : (
          <>{isPending ? <Loading width="300" height="300" /> : <NotCard type="join" />}</>
        )}
      </div>
    </div>
  );
}
