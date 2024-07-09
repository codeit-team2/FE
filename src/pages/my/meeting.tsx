import Card from '@/components/Card';
import Test from '@/components/Card/testData';
import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';
import React from 'react';

export default function Meeting() {
  const TESTS = Test;
  return (
    <div>
      <div className="flex flex-col gap-20 pb-50">
        {TESTS ? (
          <>
            {Test.map((data, index) => (
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
