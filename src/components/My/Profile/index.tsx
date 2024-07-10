import Image from 'next/image';
import React from 'react';

interface Props {
  nickname: string;
  email: string;
}

export default function Profile({ nickname, email }: Props) {
  return (
    <div className="bg-custom-profile-gradient relative mx-auto mt-68 flex h-176 w-336 max-w-screen-lg flex-col items-center justify-center rounded-lg lg:w-full">
      <Image
        src="/images/profile-image.jpg"
        alt="profile"
        width={112}
        height={112}
        className="absolute left-2/4 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary-300"
      />
      <div className="absolute right-24 top-24 cursor-pointer rounded-full border-2 border-neutral-600 bg-black p-12">
        <Image src="/icons/ic-edit.svg" alt="edit" width={24} height={24} />
      </div>
      <p className="mt-20 text-heading-2Sb text-white">{nickname}</p>
      <p className="mt-4 text-body-1Sb text-white">{email}</p>
    </div>
  );
}
