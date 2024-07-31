import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

import { useDeleteAccounts } from '@/hooks/useAccounts';

interface WithdrawModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (prev: boolean) => void;
}

export default function WithdrawModal({ isModalOpen, setIsModalOpen }: WithdrawModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const router = useRouter();

  const { mutate: mutateDeleteAccounts } = useDeleteAccounts();

  const handleDeleteAccountsClick = () => {
    mutateDeleteAccounts(null, {
      onSuccess: () => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        router.reload();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

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

  if (!isModalOpen || !portalRoot) {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-neutral-900/70"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="flex w-320 items-center justify-center rounded-md bg-white px-20 py-32 shadow-lg md:w-520 md:px-40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex h-full w-full flex-col items-center justify-between gap-24">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-0 top-0"
          >
            <Image
              src={'/icons/ic-modal-close.svg'}
              alt="modal close icon"
              width={32}
              height={32}
            />
          </button>
          <h2 className="text-heading-2Sb text-neutral-900 md:text-heading-1Sb">계정 탈퇴</h2>
          <Image
            className="h-100 w-100 md:h-150 md:w-150"
            src="/images/sad-face.png"
            alt="슬픈 표정 이미지"
            width={150}
            height={150}
          />
          <p className="flex items-center justify-center text-center text-body-1Sb text-neutral-900 md:text-heading-2Sb">
            탈퇴 시 계정 정보 및 모임 정보는
            <br />
            삭제되어 복구가 불가해요
            <br />
            정말로 탈퇴하시겠어요?
          </p>
          <div className="flex w-full gap-8 md:gap-12">
            <Button variant="secondary" onClick={handleDeleteAccountsClick} className="flex-1">
              네, 떠날래요
            </Button>
            <Button onClick={() => setIsModalOpen(false)} className="flex-1">
              아니요, 더 써볼래요
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, portalRoot);
}
