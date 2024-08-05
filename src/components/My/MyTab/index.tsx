import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

interface Props {
  setSelectTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyTap({ setSelectTab }: Props) {
  const titles = [
    {
      title: '나의 모임',
      icon: '/icons/ic-club.svg',
      iconWidth: 23,
      iconHeight: 24,
      id: 'joined',
    },
    {
      title: '나의 후기',
      icon: '/icons/ic-comnet.svg',
      iconWidth: 24,
      iconHeight: 21,
      id: 'review',
    },
    {
      title: '내가 만든 모임',
      icon: '/icons/ic-plus-primary.svg',
      iconWidth: 17,
      iconHeight: 18,
      id: 'mine',
    },
  ];

  const selectedFont = 'md:text-heading-1M text-heading-2M';
  const notSelectedFont =
    'md:text-heading-1M text-neutral-500 text-heading-2M hover:text-primary-300';

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  const handleTapChange = (index: number, id: string) => {
    setSelectedIndex(index);
    setSelectTab(id);
  };

  return (
    <div className="relative flex w-full items-center justify-start gap-12 text-nowrap sm:justify-center md:gap-32">
      {titles.map(({ title, icon, iconWidth, iconHeight, id }, index) => (
        <button
          key={index}
          className={`${selectedIndex === index ? selectedFont : notSelectedFont} flex items-center gap-2`}
          onClick={() => handleTapChange(index, id)}
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
