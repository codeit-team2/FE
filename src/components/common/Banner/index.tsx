import React from 'react';

interface BannerProps {
  variant?: 'default' | 'secondary';
  mainTitle: React.ReactNode;
  subTitle: string;
}

export default function Banner({ variant = 'default', mainTitle, subTitle }: BannerProps) {
  return (
    <div
      className={`w-full rounded-lg px-30 py-40 text-center md:px-36 md:py-44 ${variant === 'default' ? 'bg-neutral-900' : 'bg-neutral-600'}`}
    >
      <p className="mb-16 text-heading-2Sb text-white md:text-heading-1Sb">{mainTitle}</p>
      <p className="text-body-1Sb text-neutral-400 md:text-heading-2Sb">{subTitle}</p>
    </div>
  );
}
