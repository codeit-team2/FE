import React, { useEffect, useState } from 'react';

import MyCard from '@/components/My/MyCard';
import ReviewCard from '@/components/My/ReviewCard';
import NotCard from '@/components/NotCard';

import { isDateBeforeToday } from '@/lib/utils';

import { useGetGatheringsJoined } from '@/hooks/useGatherings';
import { useGetReviewsMine } from '@/hooks/useReviews';

import { Gathering, GatheringsParams } from '@/types/gatherings';
import { ReviewsParams } from '@/types/reviews';

export default function Joined() {
  const [page, setPage] = useState<number>(0);
  const [cardItems, setCardItems] = useState<Gathering[]>([]);

  // getGatheringsJoined api 호출
  const gatheringValue: GatheringsParams = {
    page: page,
    size: 5,
    sortBy: 'dateTime',
    sortOrder: 'asc',
  };

  const { data } = useGetGatheringsJoined(gatheringValue);
  useEffect(() => {
    data && setCardItems((prev) => [...prev, ...data]);
  }, [page, data]);

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
        {cardItems.length > 0 ? (
          <>
            {cardItems.map((data, index) =>
              isDateBeforeToday({ date: data.dateTime }) && data.hasReviewed ? (
                <ReviewCard key={index} data={reviewData} />
              ) : (
                <MyCard key={index} data={data} />
              ),
            )}
            <button onClick={() => setPage(page + 1)}>더보기</button>
          </>
        ) : (
          <NotCard />
        )}
      </div>
    </div>
  );
}
