import { Player } from '@lottiefiles/react-lottie-player';

interface LoadingProps {
  width: string;
  height: string;
}
export default function Loading({ width, height }: LoadingProps) {
  return (
    <>
      {/* <div className="relative h-full w-full"> */}
      <Player
        autoplay
        loop
        src="/images/loadingLottie.json"
        style={{
          height: `${width}px`,
          width: `${height}px`,
          // position: 'absolute',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
        }}
      ></Player>
      {/* </div> */}
    </>
  );
}
