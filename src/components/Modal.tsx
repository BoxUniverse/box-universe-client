import { closeModal } from '@src/features/app/modalSlice';
import { StoreDispatch } from '@stores/app';
import React, { useCallback, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
type State = {
  name: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  afterClose?: () => void;
  closeable?: boolean;
  width?: Width;
  height?: Height;
};

const Modal = ({
  width,
  height,
  name,
  children,
  className,
  style,
  afterClose,
  closeable,
}: State) => {
  const dispatch = useDispatch<StoreDispatch>();
  const _closeModal = useCallback(() => {
    if (afterClose) afterClose();
    dispatch(closeModal({ name }));
  }, [dispatch, afterClose]);

  const handlePressEsc = useCallback(
    (event) => {
      if (event.code === 'Escape') _closeModal();
    },
    [_closeModal],
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.removeEventListener('keydown', handlePressEsc);
    };
  }, [handlePressEsc]);
  return (
    <div
      onKeyUp={handlePressEsc}
      className={
        className ||
        `${width || 'w-full'} ${
          height || 'h-full'
        } top-1/2 rounded border border-purple-500 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed backdrop-blur-2xl flex items-center justify-center`
      }
      style={style || { zIndex: 999, backgroundColor: '#000000a3' }}>
      {closeable && (
        <div className="absolute top-2 right-2 bg-transparent">
          <IoClose color="white" className="cursor-pointer" size={40} onClick={_closeModal} />
        </div>
      )}
      {children}
    </div>
  );
};
export default Modal;
