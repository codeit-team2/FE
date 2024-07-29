import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

interface TapProps {
  handleMainTapClick: (title: string) => void;
  mainCategory: string;
}

export default function Tap({ handleMainTapClick, mainCategory }: TapProps) {
  const titles = [
    { title: '운동', icon: '/icons/ic-fire.svg', iconWidth: 23, iconHeight: 24 },
    { title: '활동', icon: '/icons/ic-game.svg', iconWidth: 24, iconHeight: 20 },
    { title: '학습', icon: '/icons/ic-book.svg', iconWidth: 17, iconHeight: 18 },
    { title: '문화생활', icon: '/icons/ic-diamond.svg', iconWidth: 28, iconHeight: 22 },
  ];

  const selectedFont = 'md:text-heading-1M text-heading-2M';
  const notSelectedFont =
    'md:text-heading-1M text-neutral-500 text-heading-2M hover:text-primary-300';

  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateIndicator = () => {
    const currentTab = tabRefs.current.find((tab) => tab?.textContent === mainCategory);
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
  }, [mainCategory]);

  const handleTapChange = (title: string) => {
    handleMainTapClick(title);
  };

  return (
    <div className="relative flex w-full items-center justify-center gap-12 md:gap-32">
      {titles.map(({ title, icon, iconWidth, iconHeight }, index) => (
        <button
          key={index}
          className={`${mainCategory === title ? selectedFont : notSelectedFont} flex items-center gap-2`}
          onClick={() => handleTapChange(title)}
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
        >
          <span>{title}</span>
          <div className="flex-shrink-0">
            <div className="relative" style={{ width: iconWidth, height: iconHeight }}>
              <Image src={icon} alt={`${title} icon`} fill />
            </div>
          </div>
        </button>
      ))}
      <span
        className="absolute !bottom-[-2px] h-2 rounded-full bg-neutral-900 transition-all duration-300"
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
        }}
      ></span>
    </div>
  );
}
