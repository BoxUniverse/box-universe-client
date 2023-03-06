import { Modal } from '@components';
import { RootState } from '@stores/app';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export const ModalViewImage = () => {
  const { modalViewImage }: any = useSelector<RootState>((state) => state.modalSlice);

  if (modalViewImage.isOpen) {
    return (
      <Modal name="modalViewImage" closeable={true}>
        <div className="border-purple-500  rounded-2xl w-fit flex items-center justify-center opacity-100 p-10">
          <Image alt="view-image" src={modalViewImage.image} width={300} height={300} />
        </div>
      </Modal>
    );
  }
};
export default ModalViewImage;
