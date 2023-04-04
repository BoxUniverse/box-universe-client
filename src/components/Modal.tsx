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
  overlay?: boolean;
  title?: string;
};

const Modal = ({
  width,
  height,
  title,
  overlay = true,
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
    dispatch(closeModal({ name } as any));
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
    <>
      {overlay && (
        <div className={'fixed backdrop-blur-lg w-full h-full'} style={{ zIndex: 999 }}></div>
      )}
      <div
        onKeyUp={handlePressEsc}
        className={
          className ||
          `${width || 'w-full'} ${
            height || 'h-full'
          } top-1/2 rounded-2xl border border-gray-500 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed backdrop-blur-2xl flex flex-col items-center justify-center`
        }
        style={style || { zIndex: 999, backgroundColor: '#000000a3' }}>
        {closeable && (
          <div
            className={
              'relative top-0 left-0 rounded-tl-2xl rounded-tr-2xl w-full h-16 bg-purple-500  border-b flex flex-row'
            }>
            <span
              className={
                'absolute left-1/2  text-white text-xl top-1/2 -translate-x-1/2 -translate-y-1/2 h-full  w-full items-center flex  border-gray-500  justify-center'
              }>
              {title}
            </span>
            <div className="absolute top-2 right-2 bg-transparent">
              <IoClose color="white" className="cursor-pointer " size={35} onClick={_closeModal} />
            </div>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
export default Modal;
