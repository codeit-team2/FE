import React from 'react';

import Image from 'next/image';

// import { Gathering } from '@/types/gatherings';

interface BookmarkProps {
  favorite: boolean;
  handleToggleBookmark: () => void;
  freshDataFiltering?: boolean;
}

export default function Bookmark({
  favorite,
  handleToggleBookmark,
  freshDataFiltering,
}: BookmarkProps) {
  return (
    <button type="button" onClick={handleToggleBookmark} disabled={!freshDataFiltering}>
      <div
        className={`relative transition-transform duration-300 ease-in ${!favorite ? '' : 'animate-pulseSmall'}`}
      >
        <div
          className={`flex h-40 w-40 items-center justify-center rounded-full border-2 md:h-48 md:w-48 ${!favorite ? 'border-neutral-100 bg-neutral-50' : 'animate-fadeIn border-secondary-100 bg-secondary-100'}`}
        >
          <div className="relative h-16 w-20 transition-all duration-300 ease-in md:h-18 md:w-22">
            <Image src="/icons/ic-heart-off.svg" alt="찜 버튼 하트 (꺼짐)" fill />
            <div className={`absolute h-full ${favorite ? 'inset-0 animate-fillHeart' : ''}`}>
              <Image src="/icons/ic-heart-on.svg" alt="찜 버튼 하트 (켜짐)" fill />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
