import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface LoginRequiredProps {
  onClose: () => void;
}

export default function LoginRequired({ onClose }: LoginRequiredProps) {
  return (
    <>
      <div className="fixed left-1/2 top-1/2 z-50 flex h-252 w-320 -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-md bg-white p-20 md:h-332 md:w-520 md:px-40 md:py-32">
        <div className="relative flex flex-col items-center justify-center gap-24">
          <div className="relative h-100 w-100 md:h-150 md:w-150">
            <Image src={'/images/login.png'} alt="login-required" fill />
          </div>
          <p className="text-body-1Sb text-neutral-900 md:text-heading-2Sb">로그인이 필요해요</p>
          <Button variant={'secondary'} className="w-280 text-body-1Sb md:w-440">
            <Link href={'/'}>로그인하러 가기</Link>
          </Button>
          <button className="absolute right-0 top-0" onClick={onClose}>
            <Image src={'/icons/ic-close.svg'} alt="closeicon" width={32} height={32} />
          </button>
        </div>
      </div>
    </>
  );
}
