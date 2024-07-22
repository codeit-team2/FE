import { useState } from 'react';

import { WORK_OUT } from './MockDatas';

import { Button } from '@/components/ui/button';

interface ChipTapType {
  id: string;
  title: string;
}

export default function ChipTap() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // 데이터 연동시 필요한 탭이름은 title 꺼내서 사용
  const handleMoveToDetailTap = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="mb-8 flex w-full justify-center gap-6 overflow-x-auto md:mb-16 md:gap-8">
        {WORK_OUT.map((data: ChipTapType, index: number) => (
          <Button
            // className={`px-20 hover:bg-neutral-100`}
            className={`px-20 ${index !== selectedIndex && 'hover:bg-neutral-100 hover:text-neutral-600'}`}
            key={index}
            variant="chip"
            onClick={() => handleMoveToDetailTap(index)}
            selected={index === selectedIndex}
          >
            {data.title}
          </Button>
        ))}
      </div>
    </>
  );
}
