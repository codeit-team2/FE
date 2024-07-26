import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="flex h-443 flex-col gap-32 pl-20 pt-32 md:h-240 md:flex-row md:justify-between md:pl-32 md:pr-32 md:pt-40">
        <div className="logo, description">
          <div className="relative mb-8 h-28 w-66 md:mb-13">
            <Image src="/icons/ic-logo.svg" alt="logo" fill />
          </div>
          <p className="text-heading-2Sb md:text-heading-1B">
            함께하면 더 좋은
            <br></br>
            다채로운 취미 모임 플랫폼
          </p>
        </div>
        <div data-display="mobileSize" className="flex md:gap-70 lg:gap-107">
          <div className="flex flex-col gap-29 text-body-3Sb text-neutral-500 md:text-body-2M">
            <p>
              서비스 소개
              <br></br>
              이용약관
              <br></br>
              개인정보처리방침
            </p>
            <p>@ hobbyzone All rights reserved</p>
          </div>
          <div className="text-body-3Sb text-neutral-500 md:text-body-2M">
            <p>서울시 코드고 협업로 2길 2</p>
            <p> +82-2-2222-2222</p>
            <p> hobbyzone@gmail.com</p>
          </div>
        </div>
        <div className="flex items-start gap-12 md:gap-20">
          <Link
            target="_blank"
            href="https://www.facebook.com/"
            className="rounded-full bg-neutral-50 p-19 md:p-26"
          >
            <div className="relative h-30 w-30">
              <Image src="/icons/ic-facebook.svg" alt="facebook" fill />
            </div>
          </Link>
          <Link
            href="https://x.com/"
            target="_blank"
            className="rounded-full bg-neutral-50 p-19 md:p-26"
          >
            <div className="relative h-30 w-30">
              <Image src="/icons/ic-twitter.svg" alt="twitter" fill />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            className="rounded-full bg-neutral-50 p-19 md:p-26"
          >
            <div className="relative h-30 w-30">
              <Image src="/icons/ic-instagram.svg" alt="instagram" fill />
            </div>
          </Link>
        </div>
      </footer>
    </>
  );
}
