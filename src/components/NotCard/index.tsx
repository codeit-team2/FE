import Image from 'next/image';
import { useRouter } from 'next/router';

import MakeClubModal from '@/components/MakeClub/Modal';
import { Button } from '@/components/ui/button';

interface NotcardProps {
  type: 'default' | 'bookmark' | 'mine' | 'join';
}

export default function NotCard({ type }: NotcardProps) {
  const boxinnerStyle = 'rounded-[3px] md:rounded-[4px] bg-neutral-50';

  const router = useRouter();

  const handleMoveRouting = () => {
    router.push('/');
  };

  const innerText = {
    default: (
      <>
        <p className="mb-12 text-center text-neutral-500">
          앗, 아직 모임이 없어요
          <br></br>
          지금 바로 모임을 만들어보세요
        </p>
        <MakeClubModal trigger="text" />
      </>
    ),
    bookmark: (
      <>
        <p className="mb-12 text-center text-neutral-500">
          앗, 아직 찜한 모임이 없어요
          <br></br>
          <span className="text-primary-300">모임 찾기</span>에서 하트를 눌러 마음에 드는 모임을
          찜해보세요
        </p>
        <Button className="mb-50 w-full" onClick={handleMoveRouting}>
          모임 찾기
        </Button>
      </>
    ),
    mine: (
      <>
        <p className="mb-12 text-center text-neutral-500">
          앗, 아직 내가 만든 모임이 없어요
          <br></br>
          지금 바로 모임을 만들어보세요
        </p>
        <MakeClubModal trigger="text" />
      </>
    ),
    join: (
      <>
        <p className="mb-12 text-center text-neutral-500">
          앗, 아직 나의 모임이 없어요
          <br></br>
          <span className="text-primary-300">모임 찾기</span>에서 모임에 참여해 보세요
        </p>
        <Button className="mb-50 w-full" onClick={handleMoveRouting}>
          모임 찾기
        </Button>
      </>
    ),
  };

  return (
    <>
      <div className="relative rounded-[6px] border-[1.5px] border-neutral-200 bg-neutral-100 p-8 md:rounded-lg md:border-2 md:p-20">
        <div className="flex gap-8 md:gap-20">
          <div className="h-49 w-86 rounded-[3px] bg-neutral-50 md:h-190 md:w-373 md:rounded-md" />
          <div className="flex flex-col gap-5 md:gap-12">
            <div className={`h-5 w-67 md:h-16 md:w-126 ${boxinnerStyle}`} />
            <div className={`h-5 w-85 md:h-16 md:w-187 ${boxinnerStyle}`} />
            <div className={`h-9 w-118 md:h-32 md:w-394 ${boxinnerStyle}`} />
          </div>
        </div>
        {type === 'bookmark' ? (
          <div className="absolute right-8 top-8 size-26 rounded-full shadow-md md:right-15 md:top-15 md:size-54">
            <Image src="/icons/ic-skeleton-heart.svg" alt="skeleton-heart" fill />
          </div>
        ) : (
          <div className="absolute right-6 top-8 size-15 rounded-full bg-neutral-50 md:right-30 md:top-20 md:size-54" />
        )}
        <div
          className={`absolute bottom-8 right-6 h-13 w-83 md:bottom-20 md:right-20 md:h-47 md:w-278 ${boxinnerStyle}`}
        />
      </div>
      {innerText[type]}
    </>
  );
}
