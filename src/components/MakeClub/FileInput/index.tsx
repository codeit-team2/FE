import { ERROR_MESSAGE } from '@/constants/formMessages';

import React, { useEffect, useRef, useState } from 'react';
import { Control, Controller, useFormContext } from 'react-hook-form';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface Props {
  id: 'gatheringImage';
  control: Control<FormValues>;
}

interface FormValues {
  gatheringImage: File | null;
  category: string;
  location: string;
  name: string;
  capacity: number;
}

export default function FileInput({ id, control }: Props) {
  const {
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [fileName, setFileName] = useState('');
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleButtonClick = () => {
    fileInput.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      onChange(file);
    } else {
      setFileName('');
      onChange(null);
    }
  };

  let inputIcon = { icon: '', alt: '' };
  if (fileName && isSubmitted) {
    inputIcon = { icon: 'success', alt: '성공 아이콘' };
  } else if (!fileName && isSubmitted) {
    inputIcon = { icon: 'error', alt: '실패 아이콘' };
  }

  useEffect(() => {
    setErrorMessage(errors[id]?.message?.toString());
  }, [errors[id]]);

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={null}
      render={({ field: { onChange } }) => (
        <div className="relative flex flex-row gap-8">
          <div className="relative">
            <input
              type="file"
              className="block rounded-sm bg-neutral-50 px-12 py-10 file:hidden"
              ref={fileInput}
              onChange={(e) => handleFileChange(e, onChange)}
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
            <p className="absolute -bottom-20 mt-6 text-body-2Sb text-secondary-300">
              {ERROR_MESSAGE.gatheringImage.required}
            </p>
          )}
        </div>
      )}
    />
  );
}
