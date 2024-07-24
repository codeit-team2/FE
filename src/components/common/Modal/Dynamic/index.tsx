import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface DynamicModalProps {
  modalType: 'confirm' | 'prompt' | 'message';
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  buttonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonOnClick?: () => void;
}

export default function DynamicModal({
  modalType,
  title,
  description,
  isOpen,
  onClose,
  buttonText,
  buttonOnClick,
  secondaryButtonText,
  secondaryButtonOnClick,
}: DynamicModalProps) {
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

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-neutral-900/70"
      onClick={onClose}
    >
      <div
        className="flex h-272 w-320 items-center justify-center rounded-md bg-white px-20 py-32 shadow-lg md:w-520 md:px-32 md:py-40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col items-center justify-between gap-20 md:w-440">
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
          {modalType === 'confirm' && (
            <Button onClick={buttonOnClick} className="w-full">
              {buttonText}
            </Button>
          )}
          {modalType === 'prompt' && (
            <div className="flex w-full gap-12">
              <Button
                variant="secondary"
                onClick={secondaryButtonOnClick || onClose}
                className="flex-1"
              >
                {secondaryButtonText}
              </Button>
              <Button onClick={buttonOnClick} className="flex-1">
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, portalRoot);
}
