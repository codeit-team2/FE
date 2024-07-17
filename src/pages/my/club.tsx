import React from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { TestCardData } from '@/types/testDataType';

interface Props {
  data: TestCardData[];
}

export default function Club({ data }: Props) {
  return (
    <div className="flex flex-col gap-20 pb-50">
      {/* 내가 만든 모임만 뜨도록 데이터 수정 필요 */}
      {data ? (
        <>
          {data.map((data, index) => (
            <MyCard type="club" key={index} data={data} />
          ))}
        </>
      ) : (
        <NotCard />
      )}
    </div>
  );
}
