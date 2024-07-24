import React from 'react';

import Image from 'next/image';

import ProfileEditModal from '@/components/common/Modal/ProfileEdit';

import { useGetAccounts } from '@/hooks/useAccounts';

export default function Profile() {
  const { data: user } = useGetAccounts();

  return (
    <div className="relative mx-auto mt-68 flex h-176 w-336 max-w-screen-lg flex-col items-center justify-center rounded-lg bg-custom-profile-gradient shadow-banner lg:w-full">
      <Image
        src={user?.profileImageUrl ? user.profileImageUrl : '/icons/ic-profile.svg'}
        alt="profile"
        width={112}
        height={112}
        className="absolute left-2/4 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary-300"
      />
      <div className="absolute right-24 top-24">
        <ProfileEditModal />
      </div>
      <p className="mt-20 text-heading-2Sb text-white">{user?.nickname}</p>
      <p className="mt-4 text-body-1Sb text-white">{user?.email}</p>
    </div>
  );
}
