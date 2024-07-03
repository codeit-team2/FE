import React, { useState, useEffect, useRef } from 'react';
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
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentTab = tabRefs.current[selectedIndex];
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  }, [selectedIndex]);

  // 클릭시 해당 탭의 이름이 필요하면 title꺼내서 사용
  const handleTapChange = (index: number, title: string) => {
    setSelectedIndex(index);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex items-center gap-32">
        {titles.map(({ title, icon, iconWidth, iconHeight }, index) => (
          <div
            key={index}
            className={`${selectedIndex === index ? selectedFont : notSelectedFont} cursor-pointer gap-2`}
            onClick={() => handleTapChange(index, title)}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
          >
            {title}
            <Image src={icon} alt={`${title} icon`} width={iconWidth} height={iconHeight} />
          </div>
        ))}
      </div>
      <span
        className="absolute top-full h-1 bg-black transition-all duration-300"
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
        }}
      ></span>
    </div>
  );
}