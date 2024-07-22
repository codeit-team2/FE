import { ReactNode } from 'react';

interface MainLayoutrProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutrProps) {
  return (
    <div className="h-full bg-neutral-50 px-12 pb-50 pt-20 md:px-135 md:pt-32">
      <div className="mx-auto max-w-screen-lg">{children}</div>
    </div>
  );
}
