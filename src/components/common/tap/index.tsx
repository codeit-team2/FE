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

  const selectedFont = 'text-heading-1M';
  const notSelectedFont = 'text-heading-1M text-neutral-500';

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateIndicator = () => {
    const currentTab = tabRefs.current[selectedIndex];
    if (currentTab) {
      const { offsetWidth, offsetLeft } = currentTab;

      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [selectedIndex]);

  const handleTapChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="relative flex w-full items-center justify-center gap-32">
      {titles.map(({ title, icon, iconWidth, iconHeight }, index) => (
        <div
          key={index}
          className={`cursor-pointer ${selectedIndex === index ? selectedFont : notSelectedFont} flex items-center gap-2`}
          onClick={() => handleTapChange(index)}
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
        >
          <div className="flex-shrink-0">
            <div className="relative" style={{ width: iconWidth, height: iconHeight }}>
              <Image src={icon} alt={`${title} icon`} fill />
            </div>
          </div>
          <span>{title}</span>
        </div>
      ))}
      <span
        className="absolute bottom-0 h-1 rounded-full bg-black transition-all duration-300"
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
        }}
      ></span>
    </div>
  );
}
