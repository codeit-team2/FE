import { CATEGORY_TAP } from '@/constants/dropdownItems';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface ChipTapProps {
  mainCategory: string;
  handleChipTapClick: (title: string) => void;
}

export default function ChipTap({ mainCategory, handleChipTapClick }: ChipTapProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const SELECTED_TAP = CATEGORY_TAP.find((item) => item.title === mainCategory);

  // 데이터 연동시 필요한 탭이름은 title 꺼내서 사용
  const handleMoveToDetailTap = (index: number, data: string) => {
    setSelectedIndex(index);
    handleChipTapClick(data);
  };

  return (
    <>
      <div className="mb-8 flex w-full justify-center gap-6 overflow-x-auto md:mb-16 md:gap-8">
        {SELECTED_TAP?.subcategories.map((data: string, index: number) => (
          <Button
            // className={`px-20 hover:bg-neutral-100`}
            className={`px-20 ${index !== selectedIndex && 'hover:bg-neutral-100 hover:text-neutral-600'}`}
            key={index}
            variant="chip"
            onClick={() => handleMoveToDetailTap(index, data)}
            selected={index === selectedIndex}
          >
            {data}
          </Button>
        ))}
      </div>
    </>
  );
}
