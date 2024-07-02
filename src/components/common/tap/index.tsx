import React, { useState } from 'react';
import Image from 'next/image';

export default function Tap() {
  const titles = [
    { title: '운동', icon: '/icons/fireIcon.svg', iconWidth: 23, iconHeight: 24 },
    { title: '원데이클래스', icon: '/icons/blackboardIcon.svg', iconWidth: 24, iconHeight: 21 },
    { title: '독서', icon: '/icons/bookIcon.svg', iconWidth: 17, iconHeight: 18 },
    { title: '문화생활', icon: '/icons/diamondIcon.svg', iconWidth: 28, iconHeight: 22 },
    { title: '콘텐츠 감상', icon: '/icons/eyeIcon.svg', iconWidth: 24, iconHeight: 20 },
  ];
  const selectedFont = 'flex text-24 font-semibold';
  const notSelectedFont = 'flex text-24 font-medium text-[#6B7684]';
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // const [contentWidth, setContentWidth] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };
  const contentWidth = [66.5, 150.5, 60.5, 113, 135];
  return (
    <>
      <div className="relative flex w-fit flex-col items-center">
        <div className="flex items-center gap-32">
          {titles.map(({ title, icon, iconWidth, iconHeight }, index) => (
            <div
              key={index}
              className={`${selectedIndex === index ? selectedFont : notSelectedFont} cursor-pointer gap-2 hover:bg-[#eee]`}
              onClick={() => handleClick(index)}
            >
              {title}
              <Image src={icon} alt={`${title} icon`} width={iconWidth} height={iconHeight} />
            </div>
          ))}
        </div>
        <span
          className="h-15 absolute left-0 top-full bg-black duration-500"
          style={{
            transform: `translateX(${selectedIndex * 32}px)`,
            width: `${contentWidth[selectedIndex]}px`,
          }}
        ></span>
      </div>
    </>
  );
}
