import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  item: string[];
  itemTrigger: string;
}

export default function Dropdown({ item, itemTrigger = 'Open' }: DropdownProps) {
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
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {itemValue}
      </button>
      {/* 이후 고정 값 나오면 map으로 변경작업 */}
      {isOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-item" onClick={handleItemClick}>
            아이템 1
          </li>
          <li className="dropdown-item" onClick={handleItemClick}>
            아이템 2
          </li>
          <li className="dropdown-item" onClick={handleItemClick}>
            아이템 3
          </li>
        </ul>
      )}
    </div>
  );
}
