import Card from '@/components/Card';
import Test from '@/components/Card/testData';
import NotCard from '@/components/NotCard';
import React from 'react';

export default function Meeting() {
  const TESTS = null;
  return (
    <div>
      <div className="flex flex-col gap-20 pb-50">
        {TESTS ? (
          <>
            {Test.map((data, index) => (
              <Card key={index} data={data} />
            ))}
          </>
        ) : (
          <NotCard />
        )}
      </div>
    </div>
  );
}
