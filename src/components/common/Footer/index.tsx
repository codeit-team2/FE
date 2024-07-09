import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="gap-67 h-200 flex justify-between px-32 pt-40">
        <div>
          <div className="w-66 mb-13 relative h-28">
            <Image src="/icons/ic-logo.svg" alt="logo" fill />
          </div>
          <p className="text-heading-1B">
            함께하면 더 좋은
            <br></br>
            다채로운 취미 모임 플랫폼
          </p>
        </div>
        <div className="gap-29 text-body-2M flex flex-col text-neutral-500">
          <p>
            서비스 소개
            <br></br>
            이용약관
            <br></br>
            개인정보처리방침
          </p>
          <p>@ hobbyzone All rights reserved</p>
        </div>
        <div className="text-body-2M text-neutral-500">
          <p>서울시 코드고 협업로 2길 2</p>
          <p> +82-2-2222-2222</p>
          <p> hobbyzone@gmail.com</p>
        </div>
        <div className="flex items-start gap-20">
          <Link
            target="_blank"
            href="https://www.facebook.com/"
            className="p-26 rounded-full bg-neutral-50"
          >
            <div className="w-30 h-30 relative">
              <Image src="/icons/ic-facebook.svg" alt="ic-facebook" fill />
            </div>
          </Link>
          <Link href="https://x.com/" target="_blank" className="p-26 rounded-full bg-neutral-50">
            <div className="w-30 h-30 relative">
              <Image src="/icons/ic-twitter.svg" alt="ic-twitter" fill />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            className="p-26 rounded-full bg-neutral-50"
          >
            <div className="w-30 h-30 relative">
              <Image src="/icons/ic-instagram.svg" alt="ic-instagram" fill />
            </div>
          </Link>
        </div>
      </footer>
    </>
  );
}
