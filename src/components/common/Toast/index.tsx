interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-100 left-1/2 z-50 -translate-x-1/2 transform rounded-md bg-gray-500 px-10 py-4 text-white shadow-lg">
      {message}
    </div>
  );
};

export default Toast;
