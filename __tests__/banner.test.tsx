import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Banner from '@/components/common/Banner';

describe('Banner 컴포넌트', () => {
  test('type이 home인 Banner에 대한 렌더링 테스트', () => {
    render(<Banner page="home" />);

    expect(screen.getByText('너, 내 취미 동료가 돼라')).toBeInTheDocument();
  });

  test('type이 bookmark인 Banner에 대한 렌더링 테스트', () => {
    render(<Banner page="bookmark" />);

    expect(screen.getByText('찜한 모임이에요')).toBeInTheDocument();
  });

  test('type이 review인 Banner에 대한 렌더링 테스트', () => {
    render(<Banner page="review" />);

    expect(screen.getByText('활동 후기가 증명해요')).toBeInTheDocument();
  });

  test('type이 bookmark이면서 nickname이 있는 Banner에 대한 렌더링 테스트', () => {
    render(<Banner page="bookmark" nickname="홍길동" />);

    expect(screen.getByText('홍길동님이 찜한 모임이에요')).toBeInTheDocument();
  });
});
