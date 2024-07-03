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
    const itemText = e.currentTarget.textContent;
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
    <div className="dropdown" ref={dropdownRef}>
      {/* #6B7684 */}
      <button onClick={toggleDropdown} className="text-neutral-gray-500 flex items-center">
        {itemValue}
        <Image src={icon} alt="dropdownIcon" width={32} height={32} />
      </button>

      {/* 이후 고정 값 나오면 map으로 변경작업 */}

      {isOpen ? (
        items && items.length > 0 ? (
          <div className="text-body-2Sb rounded-md bg-white py-5 shadow-[#191f28]">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={handleItemClick}
                className="hover:bg-secondary-blue-50 flex cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div> // items가 없는 경우
        )
      ) : null}
      {/* isOpen이 false일 때는 아무것도 렌더링하지 않음 */}
    </div>
  );
}
