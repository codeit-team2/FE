import React, { useMemo, useState } from 'react';

import ReviewAvailable from './review-available';
import ReviewComplete from './review-complete';

import { Button } from '@/components/ui/button';

import { isDateBeforeToday } from '@/lib/utils';

import { useGetGatheringsJoined } from '@/hooks/useGatherings';

import { Gathering, GatheringsParams } from '@/types/gatherings';

export default function Review() {
  const [isReviewWritten, setIsReviewWritten] = useState(true);

  // getGatheringsJoined api 호출
  const value: GatheringsParams = {
    page: 0, // 변수 수정
    size: 5,
    sortBy: 'dateTime',
    sortOrder: 'asc',
  };

  const { data } = useGetGatheringsJoined(value);
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item: Gathering) => isDateBeforeToday({ date: item.dateTime }));
  }, [data]);

  return (
    <div>
      <div className="mb-32 flex flex-row justify-center gap-8">
        <Button
          variant={isReviewWritten === true ? 'secondary' : 'chip'}
          type="submit"
          onClick={() => setIsReviewWritten(true)}
        >
          작성 가능한 후기
        </Button>
        <Button
          variant={isReviewWritten === false ? 'secondary' : 'chip'}
          type="submit"
          onClick={() => setIsReviewWritten(false)}
        >
          작성한 후기
        </Button>
      </div>
      <div className="flex flex-col gap-20 pb-50">
        {isReviewWritten ? <ReviewAvailable data={filteredData} /> : <ReviewComplete />}
      </div>
    </div>
  );
}
