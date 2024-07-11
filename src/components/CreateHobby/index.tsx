import Image from 'next/image';

export default function CreateHobby() {
  return (
    <>
      <button className="fixed right-1/2 z-20 cursor-pointer rounded-[40px] bg-primary-300 p-16 shadow-lg md:right-32 md:top-1/2">
        {/* <button className="fixed right-32 z-20 cursor-pointer rounded-[40px] bg-primary-300 p-16"> */}
        <div className="relative h-24 w-24">
          <Image src="/icons/ic-plus.svg" alt="plusIcon" fill />
        </div>
      </button>
    </>
  );
}