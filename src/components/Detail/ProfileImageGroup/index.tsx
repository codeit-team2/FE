import useIsMobile from '@/hooks/useIsMobile';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function ProfileImageGroup({usersProfile}: any) {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  const profileSize = isMobile ? 3 : 4;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }


  return (
    <>
      {usersProfile.slice(0, profileSize).map((user: any, index: number) => (
        <div
          key={index}
          className="relative h-36 w-36 rounded-full border-2 border-neutral-700"
          style={{
            marginLeft: index !== 0 ? '-0.75rem' : '0',
          }}
        >
          <Image
            src={user.profileImage}
            alt={`profile-${index}`}
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      ))}
      {usersProfile.length > profileSize && (
        <div
          className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-200"
          style={{
            marginLeft: '-0.75rem',
            zIndex: 0,
          }}
        >
          <span className="text-body-3Sb text-neutral-700">+{usersProfile.length - profileSize}</span>
        </div>
      )}
    </>
  );
}
