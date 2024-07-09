import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LoginRequired({ onClose }: any) {
  return (
    <>
      <div className="fixed left-1/2 top-1/2 z-50 flex h-332 w-520 -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-md bg-white px-40 py-32">
        <div className="relative flex flex-col items-center justify-center gap-24">
          <div className="relative h-150 w-150">
            <Image src={'/images/login.png'} alt="login-required" fill sizes='100%' />
          </div>
          <p className="text-heading-2Sb text-neutral-900">로그인이 필요해요</p>
          <Button variant={'secondary'} className="w-440 text-body-1Sb">
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
