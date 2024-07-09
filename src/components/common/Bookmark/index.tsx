import React, { useState } from 'react';
import Image from 'next/image';

export default function Bookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  return (
    <button type="button" className="relative h-48 w-48" onClick={handleClick}>
      <Image
        src={isBookmarked ? '/icons/ic-heart-on.svg' : '/icons/ic-heart-off.svg'}
        alt="찜 버튼"
        fill
      />
    </button>
  );
}
