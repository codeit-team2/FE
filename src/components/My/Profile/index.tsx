import React from 'react';

import Image from 'next/image';

import ProfileEditModal from '@/components/common/Modal/ProfileEdit';

import { useGetAccounts } from '@/hooks/useAccounts';

export default function Profile() {
  const { data: user } = useGetAccounts();

  return (
    <div className="relative mx-auto mt-68 flex h-176 w-full max-w-screen-lg flex-col items-center justify-center rounded-lg bg-custom-profile-gradient shadow-banner">
      <Image
        src={user?.profileImageUrl ? user.profileImageUrl : '/icons/ic-profile-gray.svg'}
        alt="profile"
        width={102}
        height={102}
        className="absolute left-2/4 top-24 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-4 border-primary-300"
      />
      <div className="absolute right-24 top-24">
        <ProfileEditModal user={user} />
      </div>
      <p className="mt-62 text-heading-2Sb text-white">{user?.nickname}</p>
      <p className="mt-4 text-body-1Sb text-white">{user?.email}</p>
    </div>
  );
}
