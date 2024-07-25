import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  profileImageUrl: string | null;
}

export default function Profile({ profileImageUrl }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // dropdown click
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // dropdown 외 바깥부분 클릭
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // item click
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const itemText = e.currentTarget?.textContent;
    console.log(itemText);
    setIsOpen(false);
  };

  // 마이페이지 클릭
  const handleMyPageClick = () => {
    setIsOpen(false);
    router.push('/my');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={() => toggleDropdown()}>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt="프로필 사진" width={32} height={32} />
        ) : (
          <Image src="/icons/ic-profile-gray.svg" alt="ic-profile" width={32} height={32} />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-52 z-10 w-100 overflow-y-scroll rounded-md bg-white px-10 py-12 text-center text-body-2Sb shadow-lg">
          <div
            className="flex w-full cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full hover:bg-primary-50"
            onClick={() => handleMyPageClick()}
          >
            마이페이지
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full hover:bg-primary-50"
            onClick={(e) => handleItemClick(e)}
          >
            로그아웃
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-center px-10 py-12 hover:rounded-full hover:bg-primary-50"
            onClick={(e) => handleItemClick(e)}
          >
            회원탈퇴
          </div>
        </div>
      )}
    </div>
  );
}
