import React from 'react';
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from 'react-icons/io5';
import { toast, ToastOptions } from 'react-toastify';

const useToast = (options?: ToastOptions) => {
  const icons = {
    success: <IoCheckmarkCircleOutline size={20} className="text-purple-500" />,
    warn: <IoWarningOutline size={20} className="text-purple-500" />,
    error: <IoCloseCircleOutline size={20} className="text-purple-500" />,
    info: <IoInformationCircleOutline size={20} className="text-purple-500" />,
  };

  const _toast = (type: 'error' | 'warn' | 'success' | 'info', message: string) => {
    if (!options)
      options = {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        icon: icons[type],
        bodyClassName: 'bg-transparent',
        className: 'bg-transparent backdrop-blur-sm border-purple-500',
        pauseOnFocusLoss: false,
      };
    toast[type](message, options);
  };
  return _toast;
};

export default useToast;
