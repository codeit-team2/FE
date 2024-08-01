import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

import useIsMobile from '@/hooks/useIsMobile';

interface LoginRequiredProps {
  isModalOpen: boolean;
  setIsModalOpen: (prev: boolean) => void;
}

export default function LoginRequired({ isModalOpen, setIsModalOpen }: LoginRequiredProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const isMobile = useIsMobile();

  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      const body = document.body;
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal');
      body.appendChild(modalRoot);
      setPortalRoot(modalRoot);

      return () => {
        body.removeChild(modalRoot);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isModalOpen]);

  const handleRedirectMainPage = () => {
    if (isMobile) {
      router.push('/login');
    } else {
      setIsModalOpen(false);
      router.push('/');
    }
  };

  if (!isModalOpen || !portalRoot) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-neutral-900/70"
      onClick={handleRedirectMainPage}
    >
      <div
        className="flex h-252 w-320 items-center justify-center rounded-md bg-white p-20 md:h-332 md:w-520 md:px-40 md:py-32"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col items-center justify-center gap-24">
          <div className="relative h-100 w-100 md:h-150 md:w-150">
            <Image src={'/images/login.png'} alt="login-required" fill />
          </div>
          <p className="text-body-1Sb text-neutral-900 md:text-heading-2Sb">로그인이 필요해요</p>
          <Button
            variant={'secondary'}
            className="w-280 text-body-1Sb md:w-440"
            onClick={handleRedirectMainPage}
          >
            로그인하러 가기
          </Button>
          <button className="absolute right-0 top-0" onClick={handleRedirectMainPage}>
            <Image src={'/icons/ic-close.svg'} alt="closeicon" width={32} height={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
