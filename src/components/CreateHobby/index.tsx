import Image from 'next/image';

export default function CreateHobby() {
  return (
    <>
      {/* box-shadow: 0px 16px 34px 0px rgba(25, 31, 40, 0.16); */}
      {/* bottom-80 left-1/2 */}
      {/* md:bottom-none */}
      <button className="fixed right-1/2 z-20 cursor-pointer rounded-[40px] bg-primary-300 p-16 shadow-lg md:right-32 md:top-1/2">
        <div className="relative h-24 w-24">
          <Image src="/icons/plus.svg" alt="plusIcon" fill />
        </div>
      </button>
    </>
  );
}
