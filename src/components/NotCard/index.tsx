import { Button } from '@/components/ui/button';

export default function NotCard() {
  const boxinnerStyle = 'rounded-[4px] bg-neutral-50';
  return (
    <>
      <div className="relative rounded-lg border-2 border-neutral-200 bg-neutral-100 p-8 md:p-20">
        <div className="flex gap-8 md:gap-20">
          <div className="md:h-190 md:w-373 w-86 h-49 rounded-md bg-neutral-50" />
          <div className="flex flex-col gap-5 md:gap-12">
            <div className={`md:w-126 w-67 h-5 md:h-16 ${boxinnerStyle}`} />
            <div className={`md:w-187 w-85 h-5 md:h-16 ${boxinnerStyle}`} />
            <div className={`w-118 md:w-394 h-9 md:h-32 ${boxinnerStyle}`} />
          </div>
        </div>
        <div className={`h-54 w-54 right-30 top-30 absolute rounded-full bg-neutral-50`} />
        <div className={`h-47 w-278 absolute bottom-20 right-20 ${boxinnerStyle}`} />
      </div>

      <p className="mb-12 text-center text-neutral-500">
        앗, 아직 모임이 없어요
        <br></br>
        지금 바로 모임을 만들어보세요
      </p>
      <Button>모임 만들기</Button>
    </>
  );
}
