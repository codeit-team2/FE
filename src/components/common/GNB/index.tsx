import { useAuth } from '@/context/AuthProvider';

import { useEffect, useRef, useState } from 'react';

import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LoginModal from '@/components/common/Modal/Login';
import SignupModal from '@/components/common/Modal/Signup';

import { useGetAccounts } from '@/hooks/useAccounts';
import useFavorite from '@/hooks/useFavorite';
import useIsMobile from '@/hooks/useIsMobile';

export default function GNB() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileClient, setIsMobileClient] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const { setIsLogin } = useAuth();

  if (!getCookie('accessToken')) {
    setIsLogin(false);
  } else {
    setIsLogin(true);
  }

  const router = useRouter();
  const { pathname } = router;

  const isMobile = useIsMobile();

  const profileButtonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLUListElement>(null);

  const { favorites } = useFavorite();

  const { data: user } = useGetAccounts();

  const handleTogglePopover = () => {
    setIsOpenPopover((prev) => !prev);
  };

  const handleLogoutClick = () => {
    deleteCookie('accessToken');
    router.reload();
  };

  const handlePopoverClickOutside = (event: MouseEvent) => {
    if (
      profileButtonRef.current &&
      !profileButtonRef.current.contains(event.target as Node) &&
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpenPopover(false);
    }
  };

  useEffect(() => {
    setIsMobileClient(isMobile);
  }, [isMobile]);

  useEffect(() => {
    document.addEventListener('mousedown', handlePopoverClickOutside);
    return () => {
      document.removeEventListener('mousedown', handlePopoverClickOutside);
    };
  }, []);

  return (
    <div className="flex h-60 w-full flex-row justify-between px-20 shadow-sm md:px-32">
      <Link className="flex" href="/">
        <Image src="/icons/ic-logo.svg" alt="logo" priority={true} width={65} height={14} />
      </Link>
      <div className="flex flex-row items-center gap-12 md:gap-40">
        <Link
          href="/"
          className={`text-body-1M text-neutral-500 hover:text-body-1M hover:text-primary-300 ${pathname === '/' && 'text-body-1Sb text-neutral-900'}`}
        >
          모임찾기
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/bookmark"
            className={`text-body-1M text-neutral-500 hover:text-body-1M hover:text-primary-300 ${
              pathname === '/bookmark' ? 'text-body-1Sb text-neutral-900' : ''
            }`}
          >
            찜한모임
          </Link>
          {favorites.length ? <p className="text-primary-300">{favorites.length}</p> : ''}
        </div>
        <Link
          href="/review"
          className={`text-body-1M text-neutral-500 hover:text-body-1M hover:text-primary-300 ${pathname === '/review' && 'text-body-1Sb text-neutral-900'}`}
        >
          활동후기
        </Link>
        {user?.email ? (
          <div className="relative cursor-pointer">
            <div ref={profileButtonRef} onClick={handleTogglePopover}>
              {user?.profileImageUrl ? (
                <Image
                  className="aspect-square rounded-full border border-neutral-300"
                  src={user.profileImageUrl}
                  alt="프로필 사진"
                  width={32}
                  height={32}
                />
              ) : (
                <div>
                  <button
                    className={`block h-32 w-32 cursor-pointer bg-[url("/icons/ic-profile-gray.svg")] hover:bg-[url("/icons/ic-profile-blue.svg")] ${isOpenPopover && 'bg-[url("/icons/ic-profile-navy.svg")]'}`}
                  />
                </div>
              )}
              {isOpenPopover && (
                <ul
                  ref={popoverRef}
                  className="absolute right-0 top-[calc(100%+22px)] z-10 w-100 rounded-md bg-white shadow-lg"
                >
                  <Link href="/my">
                    <li className="mx-4 my-5 cursor-pointer rounded-full py-7 text-center text-body-2Sb hover:bg-primary-50">
                      마이페이지
                    </li>
                  </Link>
                  <li
                    className="mx-4 my-5 cursor-pointer rounded-full py-7 text-center text-body-2Sb text-neutral-900 hover:bg-primary-50"
                    onClick={handleLogoutClick}
                  >
                    로그아웃
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div>
            {isMobileClient ? (
              <Link
                className={`text-body-1M text-neutral-500 hover:text-body-1M hover:text-primary-300 ${pathname === '/login' && 'text-body-1Sb text-neutral-900'}`}
                href={'/login'}
              >
                로그인
              </Link>
            ) : (
              <LoginModal
                isLoginModalOpen={isLoginModalOpen}
                setIsLoginModalOpen={setIsLoginModalOpen}
                isSignupModalOpen={isSignupModalOpen}
                setIsSignupModalOpen={setIsSignupModalOpen}
              />
            )}
            <SignupModal
              isSignupModalOpen={isSignupModalOpen}
              setIsSignupModalOpen={setIsSignupModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
}
