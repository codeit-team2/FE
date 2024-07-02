interface InputProps {
  type: 'text' | 'password';
  placeholder: string;
  id?: string;
  maxLength?: number;
}

export function Input({ type, id, placeholder, maxLength, ...props }: InputProps) {
  return (
    <input
      className="border border-zinc-700"
      type={type}
      placeholder={placeholder}
      id={id}
      maxLength={maxLength}
      {...props}
    />
  );
}
