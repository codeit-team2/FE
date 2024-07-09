import Test from '@/components/Card/testData';
import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';
import React from 'react';

export default function Club() {
  const TESTS = Test;
  return (
    <div className="flex flex-col gap-20 pb-50">
      {/* 내가 만든 모임만 뜨도록 데이터 수정 필요 */}
      {TESTS ? (
        <>
          {Test.map((data, index) => (
            <MyCard type="club" key={index} data={data} />
          ))}
        </>
      ) : (
        <NotCard />
      )}
    </div>
  );
}
