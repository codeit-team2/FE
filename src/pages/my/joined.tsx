import React from 'react';

import Loading from '@/components/Loading';
import MyCard from '@/components/My/MyCard';
import ReviewCard from '@/components/My/ReviewCard';
import NotCard from '@/components/NotCard';

import { isDateBeforeToday } from '@/lib/utils';

import { useGetGatheringsJoined } from '@/hooks/useGatherings';
import { useGetReviewsMine } from '@/hooks/useReviews';

import { Gathering } from '@/types/gatherings';
// import { GatheringsParams } from '@/types/gatherings';
import { ReviewsParams } from '@/types/reviews';

export default function Joined() {
  // const [page] = useState<number>(0);

  const {
    data: gatheringsData,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useGetGatheringsJoined(5, 'dateTime', 'asc');

  // getReviewsMine api 호출
  const reviewValue: ReviewsParams = {
    page: 0,
    size: 5,
    sortBy: 'score',
    sortOrder: 'asc',
  };

  const { data: reviewData } = useGetReviewsMine(reviewValue);

  return (
    <div>
      <div className="flex flex-col gap-20 pb-50">
        {gatheringsData ? (
          gatheringsData.pages.map((datas) =>
            datas.map(
              (data: Gathering, index: number) =>
                isDateBeforeToday({ date: data.dateTime }) && data.hasReviewed ? (
                  <ReviewCard key={index} data={reviewData} />
                ) : (
                  <MyCard key={index} data={data} />
                ),
              hasNextPage && <button onClick={() => fetchNextPage()}>더보기</button>,
            ),
          )
        ) : (
          <>{isPending ? <Loading width="300" height="300" /> : <NotCard />}</>
        )}
      </div>
    </div>
  );
}
