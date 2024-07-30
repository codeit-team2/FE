import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

interface NotReviewProps {
  type: 'find' | 'reviewAvailable' | 'reviewComplete' | 'detailReview';
}

export default function NotReview({ type }: NotReviewProps) {
  const router = useRouter();

  const handleMoveRouting = () => {
    router.push('/');
  };

  const innerText = {
    find: (
      <>
        <p className="text-body-1M text-neutral-500">앗, 아직 활동 후기가 없어요</p>
        <p className="text-body-1M text-neutral-500">
          <span className="text-primary-300">모임 찾기</span>에서 모임에 참여해보세요
        </p>
        <Button className="mb-40 mt-32 w-full max-w-[1008px] md:mb-50" onClick={handleMoveRouting}>
          모임찾기
        </Button>
      </>
    ),
    reviewAvailable: (
      <>
        <p className="mb-12 text-center text-neutral-500">
          앗, 아직 작성 가능한 후기가 없어요
          <br></br>
          <span className="text-primary-300">모임 찾기</span>에서 모임에 참여해보세요
        </p>
        <Button className="mb-40 mt-32 w-full max-w-[1008px] md:mb-50" onClick={handleMoveRouting}>
          모임찾기
        </Button>
      </>
    ),
    reviewComplete: (
      <>
        <p className="mb-12 text-center text-neutral-500">
          앗, 아직 작성한 후기가 없어요
          <br></br>
          <span className="text-primary-300">모임 찾기</span>에서 모임에 참여해보세요
        </p>
        <Button className="mb-40 mt-32 w-full max-w-[1008px] md:mb-50" onClick={handleMoveRouting}>
          모임찾기
        </Button>
      </>
    ),
    detailReview: (
      <p className="mb-12 text-center text-neutral-500">앗, 아직 작성한 후기가 없어요</p>
    ),
  };

  return (
    <div className="flex w-full flex-col items-center gap-20 pt-72">
      <div className="flex gap-12">
        <div className="w-full md:w-auto">
          <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
        </div>
        <div className="hidden w-full md:block md:w-auto">
          <Image src={'/images/none-review.png'} alt="none-review" width={220} height={123} />
        </div>
      </div>
      <div className="flex flex-col items-center">{innerText[type]}</div>
    </div>
  );
}
