import React, { useState } from 'react';
import Image from 'next/image';

export default function Bookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  return (
    <button type="button" className="relative h-40 w-40 lg:h-48 lg:w-48" onClick={handleClick}>
      <Image
        src={isBookmarked ? '/icons/heart-type-on.svg' : '/icons/heart-type-off.svg'}
        alt="찜 버튼"
        fill
      />
    </button>
  );
}
