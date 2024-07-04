import Image from 'next/image';

export default function CreateHobby() {
  return (
    <>
      <button className="bg-primary-300 fixed right-32 z-20 cursor-pointer rounded-[40px] p-16">
        <div className="relative h-24 w-24">
          <Image src="/icons/plus.svg" alt="plusIcon" fill />
        </div>
      </button>
    </>
  );
}
