import { Avatar } from '@mui/material';
import Link from 'next/link';
import { IoPersonCircle } from 'react-icons/io5';

const ItemDropdownSearchBar = (props: { name: string; id: string; avatar: string }) => {
  const { name, id, avatar } = props;
  const link = `/profile/${id}`;
  return (
    <div className="flex flex-row items-center my-5 z-50">
      <Avatar alt="Remy Sharp" src={avatar} className="mr-2" />
      <div className="flex items-center justify-between w-full">
        <span>{name}</span>
        <Link href={link} passHref>
          <div>
            <IoPersonCircle className="text-purple-500 cursor-pointer" size={25} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ItemDropdownSearchBar;
