import { updateModal } from '@src/features/app/modalSlice';
import { StoreDispatch } from '@stores/app';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

type Props = {
  src: string;
};

const MessageImage = ({ src }: Props) => {
  const dispatch = useDispatch<StoreDispatch>();

  const handleViewImage = () => {
    dispatch(
      updateModal({
        image: src,
        isOpen: true,
        name: 'modalViewImage',
      } as any),
    );
  };
  return (
    <div>
      <Image
        className="bg-white h-full w-48 cursor-pointer object-cover rounded-2xl"
        loading="lazy"
        width={192}
        height={192}
        decoding="async"
        src={src}
        onClick={handleViewImage}
        alt=""
      />
    </div>
  );
};
export default MessageImage;
