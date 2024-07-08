import React from 'react';

interface BannerProps {
  mainTitle: React.ReactNode;
  subTitle: string;
}

export default function Banner({ mainTitle, subTitle }: BannerProps) {
  return (
    <div className="w-full rounded-lg bg-[#191F28] py-44 text-center">
      <p className="text-24 mb-16 font-semibold leading-[140%] tracking-[-0.24px] text-white">
        {mainTitle}
      </p>
      <p className="text-20 font-semibold leading-[140%] tracking-[-0.2px] text-zinc-400">
        {subTitle}
      </p>
    </div>
  );
}
