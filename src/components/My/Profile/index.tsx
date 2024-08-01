import { useState } from 'react';

import Image from 'next/image';

import ProfileEditModal from '@/components/common/Modal/ProfileEdit';
import WithdrawModal from '@/components/common/Modal/Withdraw';

import { useGetAccounts } from '@/hooks/useAccounts';

export default function Profile() {
  const { data: user } = useGetAccounts();
  const [isDeleteAccountsModalOpen, setIsDeleteAccountsModalOpen] = useState<boolean>(false);

  const handleDeleteAccountsClick = () => {
    setIsDeleteAccountsModalOpen(true);
  };

  return (
    <div className="relative mx-auto mt-48 flex h-176 w-full max-w-screen-lg flex-col items-center justify-end gap-4 rounded-lg bg-custom-profile-gradient p-30 shadow-banner md:mt-24 md:p-32">
      <Image
        src={user?.profileImageUrl ? user.profileImageUrl : '/icons/ic-profile-gray.svg'}
        alt="profile"
        width={102}
        height={102}
        className="absolute left-2/4 top-0 aspect-square h-[120px] w-[120px] -translate-x-1/2 -translate-y-48 rounded-[50%] border-4 border-primary-300 md:h-[102px] md:w-[102px] md:-translate-y-24"
      />
      <div className="absolute left-24 top-24 md:left-auto md:right-86">
        <ProfileEditModal user={user} />
      </div>
      <button
        className="group absolute right-24 top-24 flex h-48 w-48 cursor-pointer items-center justify-center rounded-xl border-2 border-neutral-600 bg-neutral-900 hover:bg-neutral-700"
        type="button"
        onClick={handleDeleteAccountsClick}
      >
        <span className='h-24 w-24 bg-[url("/icons/ic-person-delete.svg")] bg-[length:24px] bg-center bg-no-repeat group-active:bg-[url("/icons/ic-person-delete-gray.svg")]'></span>
      </button>
      <WithdrawModal
        isModalOpen={isDeleteAccountsModalOpen}
        setIsModalOpen={setIsDeleteAccountsModalOpen}
      />
      <p className="text-heading-2Sb text-white">{user?.nickname}</p>
      <p className="text-body-1Sb text-white">{user?.email}</p>
    </div>
  );
}
