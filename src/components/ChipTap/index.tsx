import { useState } from 'react';

import MockDatas from './MockDatas';

import { Button } from '@/components/ui/button';

interface ChipTapType {
  id: string;
  title: string;
}

export default function ChipTap() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // 데이터 연동시 필요한 탭이름은 title 꺼내서 사용
  const handleMoveToDetailTap = (index: number, title: string) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="mb-8 flex w-full justify-center gap-6 overflow-x-auto md:mb-16 md:gap-8">
        {MockDatas.map((data: ChipTapType, index: number) => (
          <Button
            className="px-20"
            key={index}
            variant={'chip'}
            onClick={() => handleMoveToDetailTap(index, data.title)}
            selected={index === selectedIndex}
          >
            {data.title}
          </Button>
        ))}
      </div>
    </>
  );
}
