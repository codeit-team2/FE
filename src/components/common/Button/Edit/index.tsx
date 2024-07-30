interface EditButton {
  size: number;
}

export default function EditButton({ size }: EditButton) {
  const sizeStyles: { [key: string]: { button: string; icon: string } } = {
    '48': { button: 'w-48 h-48 border-2', icon: 'w-24 h-24 bg-[length:22px]' },
    '36': { button: 'w-36 h-36 border-[1.5px]', icon: 'w-16 h-16 bg-[length:18px]' },
  };

  return (
    <span
      className={`${sizeStyles[size].button} group flex cursor-pointer items-center justify-center rounded-xl border-neutral-600 bg-neutral-900 hover:bg-neutral-700`}
    >
      <div
        className={`${sizeStyles[size].icon} bg-[url("/icons/ic-edit.svg")] bg-center bg-no-repeat group-active:bg-[url("/icons/ic-edit-gray.svg")]`}
      ></div>
    </span>
  );
}
