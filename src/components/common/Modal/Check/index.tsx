import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

type ModalType = 'join' | 'leave' | 'cancel';

interface CheckModalProps {
  modalType: ModalType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function CheckModal({ modalType, isOpen, onClose, onConfirm }: CheckModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen || !portalRoot) {
    return null;
  }

  let title: string = '';
  let description: string = '';
  let buttonText: string = '';

  switch (modalType) {
    case 'join':
      title = '참여하기';
      description = '해당 모임에 참여하시겠습니까?';
      buttonText = '확인';
      break;
    case 'leave':
      title = '참여 취소하기';
      description = '참여 취소하시겠습니까?';
      buttonText = '확인';
      break;
    case 'cancel':
      title = '개설 취소하기';
      description = '개설을 취소하시겠습니까?';
      buttonText = '확인';
    default:
      break;
  }

  const handleClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-neutral-950/80"
      onClick={onClose}
    >
      <div
        className="flex h-272 w-320 items-center justify-center rounded-md bg-white px-20 py-32 shadow-lg md:w-520 md:px-32 md:py-40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex w-280 flex-col items-center justify-between gap-20 md:w-440">
          <button type="button" onClick={onClose} className="absolute right-0 top-0">
            <Image
              src={'/icons/ic-modal-close.svg'}
              alt="modal close icon"
              width={32}
              height={32}
            />
          </button>
          <h2 className="text-heading-1Sb text-neutral-900">{title}</h2>
          <p className="flex h-84 items-center justify-center text-heading-2Sb text-neutral-900">
            {description}
          </p>
          <Button onClick={handleClick} className="w-full text-body-1Sb">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, portalRoot);
}
