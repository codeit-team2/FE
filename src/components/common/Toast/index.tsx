import React from 'react';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-100 left-1/2 z-50 -translate-x-1/2 transform rounded-md bg-gray-500 px-10 py-4 text-white shadow-lg">
      {message}
    </div>
  );
}
