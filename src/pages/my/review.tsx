import Card from '@/components/Card';
import Test from '@/components/Card/testData';
import NotCard from '@/components/NotCard';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function Review() {
  const [clicked, setClicked] = useState('available');

  const TESTS = Test;
  return (
    <div>
      <div className="mb-32 flex flex-row justify-center gap-8">
        <Button
          variant={clicked === 'available' ? 'secondary' : 'ghost'}
          type="submit"
          onClick={() => setClicked('available')}
        >
          작성 가능한 후기
        </Button>
        <Button
          variant={clicked === 'written' ? 'secondary' : 'ghost'}
          type="submit"
          onClick={() => setClicked('written')}
        >
          작성한 후기
        </Button>
      </div>
      {/* 작성 가능한 후기와 작성한 후기 데이터에 따라서 분리 필요 */}
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
