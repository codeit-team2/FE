import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';
import { Data } from '@/types';
import React from 'react';

interface Props {
  data: Data[];
}

export default function Meeting({ data }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-20 pb-50">
        {data ? (
          <>
            {data.map((data, index) => (
              <MyCard key={index} data={data} />
            ))}
          </>
        ) : (
          <NotCard />
        )}
      </div>
    </div>
  );
}
