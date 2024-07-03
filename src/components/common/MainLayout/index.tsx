import { ReactNode } from 'react';

interface MainLayoutrProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutrProps) {
  return <div className="px-135 bg-neutral-50 pt-32">{children}</div>;
}
