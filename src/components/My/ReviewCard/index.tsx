import React from 'react';

import Image from 'next/image';

import DeleteButton from '@/components/common/DeleteButton';
import ReviewModal from '@/components/common/Modal/Review';

import NotCard from '@/components/NotCard';

import { Reviews } from '@/types/reviews';

interface Props {
  data: Reviews;
}

export default function ReviewCard({ data }: Props) {
  const formattedDate = new Date(data.createdAt).toLocaleDateString();
  const cleanDate = formattedDate.replace(/\.$/, '');

  const renderStars = (score: number) => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(
        <div key={i} className="relative h-24 w-24">
          <Image
            src={i < score ? '/icons/ic-star-on.svg' : '/icons/ic-star-off.svg'}
            alt={i < score ? 'Filled star' : 'Empty star'}
            fill
          />
        </div>,
      );
    }
    return starArray;
  };

  if (!data) {
    return <NotCard type="default" />;
  }

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg border-2 border-white bg-white p-8 hover:border-2 hover:border-neutral-100 hover:shadow-sm active:bg-neutral-50 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div className="relative h-163 w-full cursor-pointer rounded-lg bg-neutral-50 md:h-190 md:w-373">
        <Image
          src={data.gatheringInfo.gatheringImageUrl}
          alt={data.accountInfo.nickname}
          sizes="100%"
          fill
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDY2IDE1IiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNOS4wMDYyMyAzLjI2MDYxSDYuMjc2OTRDNi4yOTkwNCAzLjYyMTU3IDYuNDIyNDMgMy45NTY3NCA2LjY0NzExIDQuMjY2MTNDNi44NzE3OSA0LjU3NTUyIDcuMjEwNjUgNC44NDgwOCA3LjY2MzY5IDUuMDgzODFDOC4xMTY3MiA1LjMxOTU0IDguNjg1NzggNS40OTQ0OSA5LjM3MDg3IDUuNjA4NjdMOC40OTI0MSA3LjMyMTM4QzcuNzE1MjUgNy4xODUxIDcuMDQ4NTggNi45NTg1OCA2LjQ5MjQxIDYuNjQxODJDNS45Mzk5MyA2LjMyNTA2IDUuNDk5NzggNS45MzQ2NCA1LjE3MTk3IDUuNDcwNTVDNC44NDQxNiA1Ljk4NjIxIDQuMzk2NjUgNi40MjA4MyAzLjgyOTQzIDYuNzc0NDJDMy4yNjU4OSA3LjEyODAxIDIuNTc4OTcgNy4zODAzMSAxLjc2ODY2IDcuNTMxMzNMMC44NTE1MyA1Ljc5NjUyQzEuNTUxMzUgNS42NzQ5NyAyLjEzMTQ2IDUuNDg4OTcgMi41OTE4NiA1LjIzODUxQzMuMDUyMjcgNC45ODQzNiAzLjM5NDgxIDQuNjg3ODYgMy42MTk0OSA0LjM0OTAxQzMuODQ0MTYgNC4wMTAxNSAzLjk2OTM5IDMuNjQ3MzUgMy45OTUxOCAzLjI2MDYxSDEuMjY1ODlWMS41NDIzOEg0LjAyMjhWMC4xODg3ODVINi4yNzE0MlYxLjU0MjM4SDkuMDA2MjNWMy4yNjA2MVpNMC45OTUxNzcgOC4wMTc1MUMyLjU5MzcgOC4wMTc1MSA0LjEwMDE1IDcuOTkxNzMgNS41MTQ1MSA3Ljk0MDE3QzYuOTI4ODggNy44ODg2IDguMjU2NjkgNy43ODU0NyA5LjQ5Nzk0IDcuNjMwNzdMOS42NTI2MyA5LjI0OTU2QzguNjAyOTEgOS40MzAwNCA3LjQ2ODQ3IDkuNTY4MTYgNi4yNDkzMiA5LjY2MzkyVjE0LjA0NTFINC4wMDA3VjkuNzg1NDdDMy4wOTgzMSA5LjgxNDk0IDEuOTk3MDIgOS44Mjk2NyAwLjY5NjgzNCA5LjgyOTY3TDAuNDMxNjQxIDguMDE3NTFIMC45OTUxNzdaTTEwLjI5OSAwLjE3NzczNEgxMi41NDIxVjE0LjQ4MTZIMTAuMjk5VjAuMTc3NzM0WiIgZmlsbD0iIzE5MUYyOCIvPgogIDxwYXRoIGQ9Ik0xOS4xMjM3IDExLjQxNjlIMjUuNjQwN1YxNC4wMDA5SDE1LjcyMjdWMTEuNDE2OUwyMi4xODI3IDMuMjg0OTRIMTYuMDI2N1YwLjcwMDkzOEgyNS41ODM3TDI1LjYwMjcgMy4yODQ5NEwxOS4xMjM3IDExLjQxNjlaIiBmaWxsPSIjMTkxRjI4Ii8+CiAgPHBhdGggZD0iTTMzLjcwMDkgMC40NzI5MzlDMzcuNjE0OSAwLjQ3MjkzOSA0MC42MzU5IDMuNDM2OTQgNDAuNjM1OSA3LjM1MDk0QzQwLjYzNTkgMTEuMjY0OSAzNy42MTQ5IDE0LjIyODkgMzMuNzAwOSAxNC4yMjg5QzI5Ljc4NjkgMTQuMjI4OSAyNi43ODQ5IDExLjI2NDkgMjYuNzg0OSA3LjM1MDk0QzI2Ljc4NDkgMy40MzY5NCAyOS43ODY5IDAuNDcyOTM5IDMzLjcwMDkgMC40NzI5MzlaTTMzLjcwMDkgMy4wNTY5NEMzMS4zMDY5IDMuMDU2OTQgMjkuNTIwOSA0Ljg2MTk0IDI5LjUyMDkgNy4zNTA5NEMyOS41MjA5IDkuODM5OTQgMzEuMzA2OSAxMS42NDQ5IDMzLjcwMDkgMTEuNjQ0OUMzNi4wOTQ5IDExLjY0NDkgMzcuODgwOSA5LjgzOTk0IDM3Ljg4MDkgNy4zNTA5NEMzNy44ODA5IDQuODYxOTQgMzYuMDk0OSAzLjA1Njk0IDMzLjcwMDkgMy4wNTY5NFoiIGZpbGw9IiMxOTFGMjgiLz4KICA8cGF0aCBkPSJNNTEuNTA5OCAwLjcwMDkzOEg1NC4yMjY4VjE0LjAwMDlINTEuMDkxOEw0NS4zMTU4IDQuNjkwOTRMNDUuNTYyOCA4LjQzMzk0VjE0LjAwMDlINDIuODQ1OFYwLjcwMDkzOEg0NS45NjE4TDUxLjc1NjggMTAuMDEwOUw1MS41MDk4IDYuMjY3OTRWMC43MDA5MzhaIiBmaWxsPSIjMTkxRjI4Ii8+CiAgPHBhdGggZD0iTTY1Ljk1MzggMy4yODQ5NEg1OS43NDA4VjUuOTYzOTRINjUuNDQwOFY4LjU0Nzk0SDU5Ljc0MDhWMTEuNDE2OUg2NS45NTM4VjE0LjAwMDlINTcuMDIzOFYwLjcwMDkzOEg2NS45NTM4VjMuMjg0OTRaIiBmaWxsPSIjMTkxRjI4Ii8+Cjwvc3ZnPg=="
          className="rounded-md"
        />
        <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-neutral-700 text-body-2M text-white">
          이용완료
        </div>
      </div>
      <div className="flex grow flex-col justify-between px-20 pb-20 sm:mt-10 sm:pb-0">
        <div>
          <div className="flex flex-row">{renderStars(data.score)}</div>
          <p className="mt-6 max-h-56 w-220 min-w-230 truncate text-body-1Sb md:text-heading-2M">
            {data.comment}
          </p>
          <div className="mt-12 flex flex-row gap-6 text-body-3Sb">
            <p className="text-primary-300">{data.gatheringInfo.subCategoryName} 모임 이용</p>
            <p className="text-neutral-500">{data.gatheringInfo.location}</p>
          </div>
          <p className="mt-4 pb-16 text-body-3Sb text-neutral-500 sm:pb-0">{cleanDate}</p>
        </div>
        <div className="flex flex-row items-center justify-end gap-8">
          <ReviewModal type="modify" reviewId={data.reviewId} />
          <DeleteButton reviewId={data.reviewId} type="review" />
        </div>
      </div>
    </div>
  );
}
