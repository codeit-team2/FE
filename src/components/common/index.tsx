import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ReviewModal() {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-520 flex flex-col gap-24 p-24">
        <DialogHeader>
          <DialogTitle>리뷰 쓰기</DialogTitle>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>만족스러운 경험이었나요?</DialogTitle>
          <div className="flex flex-row gap-2">
            {[...Array(5)].map((_, index) =>
              index < rating ? (
                <FaHeart className="text-red-200" key={index} onClick={() => handleClick(index)} />
              ) : (
                <FaRegHeart
                  className="text-red-200"
                  key={index}
                  onClick={() => handleClick(index)}
                />
              ),
            )}
          </div>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>경험에 대해 남겨주세요</DialogTitle>
          <input
            type="textarea"
            className="h-120 bg-gray-100 placeholder:text-wrap placeholder:align-text-top"
            placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
          />
        </DialogHeader>
        <div className="flex w-full justify-center">
          <Button>취소</Button>
          <Button type="submit">리뷰 등록</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
