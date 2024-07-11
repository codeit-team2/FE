import { forwardRef, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Image from 'next/image';

interface InputProps {
  type: 'text' | 'password';
  id: string;
  placeholder: string;
  maxLength?: number;
  isDisabled?: boolean;
}

function Input(
  { type, id, placeholder, maxLength, isDisabled, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    getFieldState,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [typeState, setTypeState] = useState(type);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  useEffect(() => {
    setErrorMessage(errors[id]?.message?.toString());
  }, [errors[id]]);

  const handleTypeChange = () => {
    setTypeState((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const handleDeleteText = () => {
    setValue(id, '');
  };

  let inputIcon = { icon: '', alt: '' };
  if (!getFieldState(id).invalid && isSubmitted) {
    inputIcon = { icon: 'success', alt: '성공 아이콘' };
  } else if (errorMessage && isSubmitted) {
    inputIcon = { icon: 'error', alt: '실패 아이콘' };
  } else if (watch(id) !== '') {
    inputIcon = { icon: 'xmark', alt: '텍스트 삭제 아이콘' };
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          className={`h-42 w-full rounded-sm bg-neutral-50 py-10 pl-20 text-body-1M text-neutral-900 caret-primary-300 outline-none placeholder:text-neutral-400 ${type === 'password' ? 'pr-66' : 'pr-36'} ${errorMessage && isSubmitted && 'border border-secondary-300'} ${isDisabled && 'bg-neutral-100 text-neutral-400'}`}
          type={typeState}
          id={id}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={isDisabled}
          ref={ref}
          {...props}
        />
        <div className="absolute right-12 top-1/2 flex -translate-y-1/2 gap-6">
          {inputIcon.icon && (
            <Image
              className={`${inputIcon.icon === 'xmark' && 'cursor-pointer'}`}
              src={`/icons/ic-${inputIcon.icon}.svg`}
              alt={inputIcon.alt}
              width={24}
              height={24}
              onClick={() => inputIcon.icon === 'xmark' && handleDeleteText()}
            />
          )}
          {type === 'password' && (
            <Image
              className="cursor-pointer"
              src={typeState === 'text' ? '/icons/ic-eye-on.svg' : '/icons/ic-eye-off.svg'}
              alt={
                typeState === 'text' ? '비밀번호 보이는 상태 아이콘' : '비밀번호 숨겨진 상태 아이콘'
              }
              width={24}
              height={24}
              onClick={handleTypeChange}
            />
          )}
        </div>
      </div>
      {errorMessage && isSubmitted && (
        <p className="absolute mt-6 text-body-2Sb text-secondary-300">{errorMessage}</p>
      )}
    </div>
  );
}

export default forwardRef(Input);
