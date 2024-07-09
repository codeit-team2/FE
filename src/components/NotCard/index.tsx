import { Button } from '@/components/ui/button';
import MakeClubModal from '@/components/MakeClub/Modal';

export default function NotCard() {
  const boxinnerStyle = 'rounded-[4px] bg-neutral-50';
  return (
    <>
      <div className="relative rounded-lg border-2 border-neutral-200 bg-neutral-100 p-20">
        <div className="flex gap-20">
          <div className={`h-190 w-373 rounded-md bg-neutral-50`} />
          <div className="flex flex-col gap-12">
            <div className={`h-16 w-126 ${boxinnerStyle}`} />
            <div className={`h-16 w-187 ${boxinnerStyle}`} />
            <div className={`h-32 w-394 ${boxinnerStyle}`} />
          </div>
        </div>
        <div className={`absolute right-30 top-30 h-54 w-54 rounded-full bg-neutral-50`} />
        <div className={`absolute bottom-20 right-20 h-47 w-278 ${boxinnerStyle}`} />
      </div>

      <p className="mb-12 text-center text-neutral-500">
        앗, 아직 모임이 없어요
        <br></br>
        지금 바로 모임을 만들어보세요
      </p>
      <MakeClubModal trigger="text" />
      {/* <Button>모임 만들기</Button> */}
    </>
  );
}
