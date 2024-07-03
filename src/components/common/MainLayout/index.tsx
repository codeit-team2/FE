import { ReactNode } from 'react';

interface MainLayoutrProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutrProps) {
  return <div className="bg-neutral-gray-50 px-135 mt-32">{children}</div>;
}
