import Image from 'next/image';

interface LikedProps {
  onClick: () => void;
  isBookmarked: boolean;
}

export default function Liked({ onClick, isBookmarked }: LikedProps) {
  return (
    <button type="button" className="relative h-48 w-48" onClick={onClick}>
      <Image
        src={isBookmarked ? '/icons/ic-heart-on.svg' : '/icons/ic-heart-off.svg'}
        alt="찜 버튼"
        fill
        className="absolute"
      />
    </button>
  );
}
