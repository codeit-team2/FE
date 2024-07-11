import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  items?: string[];
  icon: string;
  itemTrigger: string;
  type?: string;
}

export default function Dropdown({
  items,
  icon,
  itemTrigger = 'Open',
  type = 'default',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemValue, setItemValue] = useState(itemTrigger);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (e: any) => {
    const itemText = e.currentTarget?.textContent;
    setIsOpen(false);
    setItemValue(itemText);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="z-50">
      <button
        onClick={toggleDropdown}
        className={`${type === 'default' ? 'relative flex items-center text-body-2M text-neutral-500 md:text-body-1M' : 'relative flex w-full items-center justify-between rounded-sm bg-neutral-50 px-12 py-10 text-body-2M text-neutral-400 md:text-body-1M'}`}
        type="button"
      >
        {itemValue}
        {itemTrigger === '마감임박' ? (
          <div className="relative h-32 w-32">
            <Image src={icon} alt="ic-chevron-down" fill className="px-11 py-8" />
          </div>
        ) : (
          <div className="relative h-32 w-32">
            <Image src={icon} alt="ic-chevron-down" fill />
          </div>
        )}
      </button>

      {/* 이후 고정 값 나오면 변경작업 */}
      {isOpen ? (
        items && items.length > 0 ? (
          <div
            className={`${type === 'default' ? 'absolute z-10 rounded-md bg-white py-5 text-body-2Sb shadow-[#191f28]' : 'absolute z-10 mt-4 w-full rounded-md bg-neutral-50 py-5 text-body-2Sb text-neutral-400 shadow-[#191f28]'} `}
          >
            {items.map((item, index) => (
              <div
                key={index}
                onClick={handleItemClick}
                className="flex cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full hover:bg-primary-50"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute z-10">Loading...</div> // items가 없는 경우
        )
      ) : null}
      {/* isOpen이 false일 때는 아무것도 렌더링하지 않음 */}
    </div>
  );
}
