import { Button } from '@/components/ui/button';

export default function NotCard() {
  const boxinnerStyle = 'rounded-[4px] bg-neutral-50';
  return (
    <>
      <div className="relative rounded-lg border-2 border-neutral-200 bg-neutral-100 p-20">
        <div className="flex gap-20">
          <div className={`h-190 w-373 rounded-md bg-neutral-50`} />
          <div className="flex flex-col gap-12">
            <div className={`w-126 h-16 ${boxinnerStyle}`} />
            <div className={`w-187 h-16 ${boxinnerStyle}`} />
            <div className={`w-394 h-32 ${boxinnerStyle}`} />
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
