import { ReactNode } from 'react';

interface BackgroundColorProps {
  children: ReactNode;
}

export default function BackgroundColor({ children }: BackgroundColorProps) {
  return <div className="bg-neutral-gray-50">{children}</div>;
}
