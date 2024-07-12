import { Player } from '@lottiefiles/react-lottie-player';

interface LoadingProps {
  width: string;
  height: string;
}
export default function Loading({ width, height }: LoadingProps) {
  return (
    <>
      <Player
        autoplay
        loop
        src="/images/loadingLottie.json"
        style={{ height: `${width}px`, width: `${height}px` }}
      ></Player>
    </>
  );
}
