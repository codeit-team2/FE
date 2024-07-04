import Image from 'next/image';

export default function Person({ data }: any) {
  return (
    <>
      {data.member > 5 ? (
        <>
          <Image src="/icons/overPersonIcon.svg" alt="overPersonIcon" width={24} height={24} />
          <div className="text-14 text-primary-300">{data.member}/20</div>
        </>
      ) : (
        <>
          <Image src="/icons/basePersonIcon.svg" alt="basePersonIcon" width={24} height={24} />
          <div className="text-14 text-neutral-500">{data.member}/20</div>
        </>
      )}
    </>
  );
}
