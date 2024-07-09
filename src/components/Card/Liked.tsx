import Image from 'next/image';

interface LikedProps {
  onClick: () => void;
  isBookmarked: boolean;
}

export default function Liked({ onClick, isBookmarked }: LikedProps) {
  return (
    <button
      type="button"
      className="absolute right-20 top-187 z-10 md:right-30 md:top-30"
      onClick={onClick}
    >
      <div className="relative h-48 w-48">
        <Image
          src={isBookmarked ? '/icons/heart-pink.svg' : '/icons/heart-gray.svg'}
          alt="찜 버튼"
          fill
          className="absolute"
        />
      </div>
    </button>
  );
}
