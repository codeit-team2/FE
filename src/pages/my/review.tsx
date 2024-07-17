import React, { useMemo, useState } from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';
import { Button } from '@/components/ui/button';

import { TestCardData } from '@/types/testDataType';

interface Props {
  data: TestCardData[];
}

function isDateBeforeToday(date: string): boolean {
  const compareDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return compareDate < today;
}

export default function Review({ data }: Props) {
  const [clicked, setClicked] = useState(true);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => item.review === clicked && isDateBeforeToday(item.date));
  }, [data, clicked]);

  return (
    <div>
      <div className="mb-32 flex flex-row justify-center gap-8">
        <Button
          variant={clicked === true ? 'secondary' : 'ghost'}
          type="submit"
          onClick={() => setClicked(true)}
        >
          작성 가능한 후기
        </Button>
        <Button
          variant={clicked === false ? 'secondary' : 'ghost'}
          type="submit"
          onClick={() => setClicked(false)}
        >
          작성한 후기
        </Button>
      </div>
      <div className="flex flex-col gap-20 pb-50">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <MyCard key={index} data={item} type={clicked ? 'default' : 'review'} />
          ))
        ) : (
          <NotCard />
        )}
      </div>
    </div>
  );
}
