import { Button } from '@/components/ui/button';
import MakeClubModal from '@/components/MakeClub/Modal';

export default function NotCard() {
  const boxinnerStyle = 'rounded-[3px] md:rounded-[4px] bg-neutral-50';

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
        <div
          className={`absolute right-6 top-8 size-15 rounded-full bg-neutral-50 md:right-30 md:top-20 md:size-54`}
        />
        <div
          className={`absolute bottom-8 right-6 h-13 w-83 md:bottom-20 md:right-20 md:h-47 md:w-278 ${boxinnerStyle}`}
        />
      </div>

      <p className="mb-12 text-center text-neutral-500">
        앗, 아직 모임이 없어요
        <br></br>
        지금 바로 모임을 만들어보세요
      </p>
      <Button className="mb-50 hidden md:block">모임 만들기</Button>
      <MakeClubModal trigger="text" />
    </>
  );
}
