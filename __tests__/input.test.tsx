import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { FormProvider, useForm } from 'react-hook-form';

import Input from '@/components/common/Input';

const Wrapper = (props: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{props.children}</FormProvider>;
};

describe('Input 컴포넌트', () => {
  test('Input 컴포넌트가 문서에 존재하는지 테스트', async () => {
    render(
      <Wrapper>
        <Input type="text" id="nickname" placeholder="닉네임을 입력해 주세요" />
      </Wrapper>,
    );

    const input = screen.getByPlaceholderText('닉네임을 입력해 주세요') as HTMLInputElement;

    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });
  });

  test('input의 입력 값이 올바르게 업데이트되는지 테스트', async () => {
    render(
      <Wrapper>
        <Input type="text" id="nickname" placeholder="닉네임을 입력해 주세요" />
      </Wrapper>,
    );

    const input = screen.getByPlaceholderText('닉네임을 입력해 주세요') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: '테스트닉네임' } });
    });

    expect(input.value).toBe('테스트닉네임');
  });

  test('비밀번호 보이기/숨기기 토글 버튼이 작동되는지 테스트', async () => {
    render(
      <Wrapper>
        <Input type="password" id="password" placeholder="비밀번호를 입력해 주세요" />
      </Wrapper>,
    );

    const eyeIcon = screen.getByAltText('비밀번호 숨겨진 상태 아이콘');

    fireEvent.click(eyeIcon);

    const input = screen.getByPlaceholderText('비밀번호를 입력해 주세요') as HTMLInputElement;

    await waitFor(() => {
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  test('에러 메시지가 표시되는지 확인', async () => {
    render(
      <Wrapper>
        <Input
          type="text"
          id="nickname"
          placeholder="닉네임을 입력해 주세요"
          propErrorMessage="2자~8자 사이의 닉네임을 입력해 주세요"
        />
      </Wrapper>,
    );

    const errorMessage = screen.getByText('2자~8자 사이의 닉네임을 입력해 주세요');

    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
