import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import Calendar from '@/components/common/Calendar';

interface DropdownProps {
  items?: string[];
  icon: string;
  isUpDown?: boolean;
  itemTrigger: string;
  type?: string;
}

export default function Dropdown({
  items,
  icon,
  isUpDown,
  itemTrigger = 'Open',
  type = 'default',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemValue, setItemValue] = useState<string | null>(itemTrigger);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const itemText = e.currentTarget?.textContent;
    setIsOpen(false);
    setItemValue(itemText);
  };

  const handleCalendarClick = (date: string) => {
    setIsOpen(false);
    setItemValue(date);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-10">
      <button
        onClick={toggleDropdown}
        className={`${type === 'default' ? 'relative flex items-center text-body-2M text-neutral-500 md:text-body-1M' : 'relative flex w-full items-center justify-between rounded-sm bg-neutral-50 px-12 py-10 text-body-2M text-neutral-400 md:text-body-1M'}`}
        type="button"
      >
        {itemValue}
        <div className="relative h-32 w-32">
          <Image src={icon} alt="ic-chevron-down" fill className={isUpDown ? 'px-11 py-8' : ''} />
        </div>
      </button>

      {/* 이후 고정 값 나오면 변경작업 */}
      {isOpen ? (
        items && items.length > 0 ? (
          <div className="absolute z-10 w-full rounded-md bg-white px-4 py-5 text-body-2Sb shadow-lg">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={handleItemClick}
                className={`${type === 'default' ? 'my-4 flex cursor-pointer items-center justify-center py-7 hover:rounded-full hover:bg-primary-50' : 'flex w-full cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full hover:bg-primary-50'}`}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <Calendar isDropdown handleCalendarClick={handleCalendarClick} />
        )
      ) : null}
      {/* isOpen이 false일 때는 아무것도 렌더링하지 않음 */}
    </div>
  );
}
