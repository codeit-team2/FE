import Image from 'next/image';

export default function Person({ data }: any) {
  return (
    <>
      {data.member > 5 ? (
        <div className="flex items-center gap-2">
          <Image src="/icons/ic-person-blue.svg" alt="ic-person-blue" width={24} height={24} />
          <div className="mr-8 text-body-2Sb text-primary-300">{data.member}/20</div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Image src="/icons/ic-person-gray.svg" alt="ic-person-gray" width={24} height={24} />
          <div className="mr-8 text-body-2Sb text-neutral-500">{data.member}/20</div>
        </div>
      )}
    </>
  );
}
