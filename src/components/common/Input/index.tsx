import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  type: 'text' | 'password';
  id: string;
  placeholder: string;
  maxLength?: number;
  isDisabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, placeholder, maxLength, isDisabled, ...props }, ref) => {
    const {
      getFieldState,
      setValue,
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

    const inputIcon =
      !getFieldState(id).invalid && isSubmitted
        ? { icon: 'success', alt: '성공 아이콘' }
        : errorMessage
          ? { icon: 'error', alt: '실패 아이콘' }
          : { icon: 'xmark', alt: '텍스트 삭제 아이콘' };

    return (
      <div className="relative">
        <div className="relative">
          <input
            className={`h-42 w-full rounded-sm bg-neutral-50 py-10 pl-20 pr-66 text-body-1M text-neutral-900 caret-primary-300 outline-none placeholder:text-neutral-400 ${errorMessage && 'border border-secondary-300'} ${isDisabled && 'bg-neutral-100 text-neutral-400'}`}
            type={typeState}
            id={id}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={isDisabled}
            ref={ref}
            {...props}
          />
          <div className="absolute right-12 top-1/2 flex -translate-y-1/2 gap-6">
            <Image
              className={`${inputIcon.icon === 'xmark' && 'cursor-pointer'}`}
              src={`/icons/ic-${inputIcon.icon}.svg`}
              alt={inputIcon.alt}
              width={24}
              height={24}
              onClick={() => inputIcon.icon === 'xmark' && handleDeleteText()}
            />
            {type === 'password' && (
              <Image
                className="cursor-pointer"
                src={typeState === 'text' ? '/icons/ic-eye-on.svg' : '/icons/ic-eye-off.svg'}
                alt={
                  typeState === 'text'
                    ? '비밀번호 보이는 상태 아이콘'
                    : '비밀번호 숨겨진 상태 아이콘'
                }
                width={24}
                height={24}
                onClick={handleTypeChange}
              />
            )}
          </div>
        </div>
        {errorMessage && (
          <p className="absolute mt-6 text-body-2Sb text-secondary-300">{errorMessage}</p>
        )}
      </div>
    );
  },
);

export default Input;
