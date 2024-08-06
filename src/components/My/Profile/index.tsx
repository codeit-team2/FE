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
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEzMF81ODkyKSI+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE1LjUiIGZpbGw9IiNFNUU4RUIiIHN0cm9rZT0iI0IwQjhDMSIvPgo8ZWxsaXBzZSBjeD0iMTkuOTk5NCIgY3k9IjEyLjg1NzQiIHJ4PSIxLjcxNDI5IiByeT0iMiIgZmlsbD0iIzZCNzY4NCIvPgo8ZWxsaXBzZSBjeD0iMTEuOTk5NCIgY3k9IjEyLjg1NzQiIHJ4PSIxLjcxNDI5IiByeT0iMiIgZmlsbD0iIzZCNzY4NCIvPgo8cGF0aCBkPSJNMTkuNTcwNiAxOC4yODUyQzIwLjEyMjkgMTguMjg1MiAyMC41ODE5IDE4LjczODQgMjAuNDYyNiAxOS4yNzc2QzIwLjAwOTMgMjEuMzI1MiAxOC4xODMxIDIyLjg1NjYgMTUuOTk5MiAyMi44NTY2QzEzLjgxNTIgMjIuODU2NiAxMS45ODkgMjEuMzI1MiAxMS41MzU4IDE5LjI3NzZDMTEuNDE2NCAxOC43Mzg0IDExLjg3NTUgMTguMjg1MiAxMi40Mjc3IDE4LjI4NTJMMTUuOTk5MiAxOC4yODUyTDE5LjU3MDYgMTguMjg1MloiIGZpbGw9IiM2Qjc2ODQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xMzBfNTg5MiI+CjxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
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
