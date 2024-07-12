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
        className={`relative flex h-40 w-40 items-center justify-center transition-transform duration-300 ease-in md:h-48 md:w-48 ${!isBookmarked ? '' : 'animate-pulseSmall'}`}
      >
        <Image
          src={isBookmarked ? '/icons/ic-heart-bg-on.svg' : '/icons/ic-heart-bg-off.svg'}
          alt="찜 버튼 배경"
          layout="fill"
        />
        <div className="relative h-18 w-20 transition-all duration-300 ease-in md:h-22 md:w-24">
          <Image src="/icons/ic-heart-off.svg" alt="찜 버튼 하트 (꺼짐)" layout="fill" />
          <div className={`absolute ${isBookmarked ? 'animate-fillHeart inset-0' : ''}`}>
            <Image src="/icons/ic-heart-on.svg" alt="찜 버튼 하트 (켜짐)" layout="fill" />
          </div>
        </div>
      </div>
    </button>
  );
}
