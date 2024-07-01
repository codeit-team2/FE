import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ReviewModal() {
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
          <p>❤️ ❤️ ❤️ ❤️ ❤️</p> {/* 버튼 추가 필요 */}
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
