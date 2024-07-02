import React from 'react';

interface BannerProps {
  mainTitle: React.ReactNode;
  subTitle: string;
}

export default function Banner({ mainTitle, subTitle }: BannerProps) {
  return (
    <div className="w-full rounded-30 bg-[#191F28] py-44 text-center">
      <p className="mb-16 text-24 font-semibold leading-[140%] tracking-[-0.24px] text-white">
        {mainTitle}
      </p>
      <p className="text-20 font-semibold leading-[140%] tracking-[-0.2px] text-zinc-400">
        {subTitle}
      </p>
    </div>
  );
}
