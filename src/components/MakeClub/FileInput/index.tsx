import { ERROR_MESSAGE } from '@/constants/formMessages';

import React, { useRef, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface Props {
  isSubmitted?: boolean;
  setGatheringImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function FileInput({ setGatheringImage, isSubmitted }: Props) {
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const fileInput = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInput.current?.click();
  };

  let inputIcon = { icon: '', alt: '' };
  if (fileName && isSubmitted) {
    inputIcon = { icon: 'success', alt: '성공 아이콘' };
  } else if (!fileName && isSubmitted) {
    inputIcon = { icon: 'error', alt: '실패 아이콘' };
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      setErrorMessage(null);
      setGatheringImage(file);
    } else {
      setFileName('');
      setErrorMessage(ERROR_MESSAGE.thumbnail.required);
    }
  };

  return (
    <div className="relative flex flex-row gap-8">
      <div className="relative">
        <input
          type="file"
          className="block rounded-sm bg-neutral-50 px-12 py-10 file:hidden"
          ref={fileInput}
          onChange={(e) => handleFileChange(e)}
        />
        <div className="absolute right-12 top-1/2 flex -translate-y-1/2 gap-6">
          {inputIcon.icon && (
            <Image
              className={`${inputIcon.icon === 'xmark' && 'cursor-pointer'}`}
              src={`/icons/ic-${inputIcon.icon}.svg`}
              alt={inputIcon.alt}
              width={24}
              height={24}
            />
          )}
        </div>
      </div>
      <Button variant="chip" selected={true} onClick={() => handleButtonClick()} type="button">
        파일 찾기
      </Button>
      {errorMessage && isSubmitted && (
        <p className="absolute -bottom-20 mt-6 text-body-2Sb text-secondary-300">{errorMessage}</p>
      )}
    </div>
  );
}
