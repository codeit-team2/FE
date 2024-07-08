import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  items?: string[];
  icon: string;
  itemTrigger: string;
}

export default function Dropdown({ items, icon, itemTrigger = 'Open' }: DropdownProps) {
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
    <div ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-body-1M relative flex items-center text-neutral-500"
      >
        {itemValue}
        {itemTrigger === '마감임박' ? (
          <div className="relative h-32 w-32">
            <Image src={icon} alt="dropdownIcon" fill className="px-11 py-8" />
          </div>
        ) : (
          <div className="relative h-32 w-32">
            <Image src={icon} alt="dropdownIcon" fill />
          </div>
        )}
      </button>

      {/* 이후 고정 값 나오면 변경작업 */}
      {isOpen ? (
        items && items.length > 0 ? (
          <div className="text-body-2Sb absolute z-10 rounded-md bg-white py-5 shadow-[#191f28]">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={handleItemClick}
                className="hover:bg-primary-50 flex cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full"
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
