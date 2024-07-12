import React, { useState } from 'react';

import Image from 'next/image';

export default function Bookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <button type="button" onClick={handleClick}>
      <div
        className={`relative transition-transform duration-300 ease-in ${!isBookmarked ? '' : 'animate-pulseSmall'}`}
      >
        <div
          className={`flex h-40 w-40 items-center justify-center rounded-full border-2 md:h-48 md:w-48 ${!isBookmarked ? 'border-neutral-100 bg-neutral-50' : 'border-secondary-100 bg-secondary-100'}`}
        >
          <div className="relative h-18 w-20 transition-all duration-300 ease-in md:h-22 md:w-24">
            <Image src="/icons/ic-heart-off.svg" alt="찜 버튼 하트 (꺼짐)" layout="fill" />
            <div className={`absolute ${isBookmarked ? 'animate-fillHeart inset-0' : ''}`}>
              <Image src="/icons/ic-heart-on.svg" alt="찜 버튼 하트 (켜짐)" layout="fill" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
