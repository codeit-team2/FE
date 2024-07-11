import React from 'react';
import Image from 'next/image';

interface NotReviewProps {
  text?: React.ReactNode;
}

export default function NotReview({ text }: NotReviewProps) {
  return (
    <div className="flex flex-col items-center gap-20 pt-16">
      <div className="flex gap-12">
        <div className="w-full md:w-auto">
          <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
        </div>
        <div className="hidden w-full md:block md:w-auto">
          <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <p className="text-body-1M text-neutral-500">앗, 아직 활동 후기가 없어요</p>
        <p className="text-body-1M text-neutral-500">{text}</p>
      </div>
    </div>
  );
}
