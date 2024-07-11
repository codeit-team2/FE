import React from 'react';

interface BannerProps {
  variant?: 'default' | 'bookmark' | 'review';
  mainTitle: React.ReactNode;
  subTitle: string;
}

export default function Banner({ variant = 'default', mainTitle, subTitle }: BannerProps) {
  const variantBg = () => {
    switch (variant) {
      case 'bookmark':
        return 'bg-neutral-600';
      case 'review':
        return 'bg-neutral-500';
      case 'default':
      default:
        return 'bg-neutral-900';
    }
  };

  const variantText = () => {
    switch (variant) {
      case 'review':
        return 'text-neutral-300';
      case 'default':
      default:
        return 'text-neutral-400';
    }
  };

  return (
    <div className={`w-full rounded-lg px-30 py-40 text-center md:px-36 md:py-44 ${variantBg()}`}>
      <p className="mb-16 text-heading-2Sb text-white md:text-heading-1Sb">{mainTitle}</p>
      <p className={`text-body-1Sb md:text-heading-2Sb ${variantText()}`}>{subTitle}</p>
    </div>
  );
}
