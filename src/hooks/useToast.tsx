import { Avatar } from '@mui/material';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from 'react-icons/io5';
import { toast, ToastOptions } from 'react-toastify';

const useToast = (options: ToastOptions = {}) => {
  const icons = {
    success: <IoCheckmarkCircleOutline size={20} className="text-purple-500" />,
    warn: <IoWarningOutline size={20} className="text-purple-500" />,
    error: <IoCloseCircleOutline size={20} className="text-purple-500" />,
    info: <IoInformationCircleOutline size={20} className="text-purple-500" />,
  };

  return (
    type: 'error' | 'warn' | 'success' | 'info' | 'avatar',
    message: string,
    avatar?: string,
  ) => {
    options = {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      icon:
        type === 'avatar' ? (
          <>
            <Avatar src={avatar} className="mr-5 -left-2" sx={{ width: 30, height: 30 }} />
          </>
        ) : (
          icons[type]
        ),
      bodyClassName: 'bg-transparent',
      className: 'bg-transparent backdrop-blur-sm border-purple-500',
      pauseOnFocusLoss: false,
      ...options,
    };

    toast[type === 'avatar' ? 'success' : type](message, options);
  };
};

export default useToast;
