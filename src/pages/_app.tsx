import { AuthProvider } from '@/context/AuthProvider';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import { Suspense } from 'react';
// import { ErrorBoundary } from 'react-error-boundary';
import type { AppProps } from 'next/app';

// import Loading from '@/components/Loading';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <ErrorBoundary fallback={<div>ERROR!!!!!</div>}> */}
        <Component {...pageProps} />
        {/* </ErrorBoundary> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
