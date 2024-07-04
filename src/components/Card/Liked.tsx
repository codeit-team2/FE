import Image from 'next/image';

interface LikedProps {
  onClick: () => void;
  isBookmarked: boolean;
}

export default function Liked({ onClick, isBookmarked }: LikedProps) {
  return (
    <button type="button" className="relative h-48 w-48" onClick={onClick}>
      <Image
        src={isBookmarked ? '/icons/heart-pink.svg' : '/icons/heart-gray.svg'}
        alt="찜 버튼"
        fill
        className="absolute"
      />
    </button>
  );
}
