import { Data } from '@/types';

import React, { useState } from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';
import { Button } from '@/components/ui/button';

import useIsDateBeforeToday from '@/hooks/useIsDateBeforeToday';

interface Props {
  data: Data[];
}

export default function Review({ data }: Props) {
  const [clicked, setClicked] = useState(true);

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
        {data ? (
          <>
            {data
              .filter((data) => data.review === clicked)
              .map(
                (data, index) =>
                  useIsDateBeforeToday({ date: data.date }) && (
                    <MyCard
                      key={index}
                      data={data}
                      type={clicked === true ? 'default' : 'review'}
                    />
                  ),
              )}
          </>
        ) : (
          <NotCard />
        )}
      </div>
    </div>
  );
}
