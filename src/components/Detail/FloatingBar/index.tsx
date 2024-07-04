import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export default function FloatingBar({ data }: any) {
  const maxReached = data.member >= 20;

  const [isEntered, setIsEntered] = useState(false);

  const handleClick = () => {
    setIsEntered((prevIsEntered) => !prevIsEntered);
  };

  return (
    <div className="fixed bottom-0 flex h-74 w-full items-center justify-center border border-t-neutral-100 py-16 backdrop-blur-sm">
      <Button
        className="w-392"
        onClick={handleClick}
        disabled={!isEntered && maxReached}
        children={isEntered ? '참여 취소하기' : '참여하기'}
      />
    </div>
  );
}
