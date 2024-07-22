import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import { ErrorBoundary } from 'react-error-boundary';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ErrorBoundary fallback={<div>ERROR!!!!!</div>}> */}
      <Component {...pageProps} />
      {/* </ErrorBoundary> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
