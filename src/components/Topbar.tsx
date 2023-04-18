import { SearchBar } from '@components';
import logo from '@images/logo.png';
import Image from 'next/image';

type Props = {
  page: string;
};
export const Topbar = (props: Props) => {
  const { page } = props;
  return (
    <div className="fixed text-white top-0 h-1/7 w-full flex border-b border-gray-500 flex-col md:flex-row md:gap-0 md:justify-between justify-center items-center pr-5 md:h-1/7 h-24   before:absolute before:backdrop-blur-md before:top-0 before:left-0 before:-z-10 before:w-full before:h-full z-50">
      <div className="flex flex-row">
        <div className="flex  w-20 left-2 md:h-full h-72 justify-center items-center md:flex hidden">
          <Image src={logo.src} className="" alt="logo" width={80} height={80} />
        </div>
        <div className="items-center tracking-widest uppercase ml-2 text-lg font-bold flex hidden md:flex ">
          <span className="text-purple-500 pl-2 bg-white rounded-l-md">Box</span>
          <span className="text-white bg-purple-500 pr-2 rounded-r-md">Universe</span>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <span className="tracking-widest text-xl uppercase font-semibold">{page}</span>
      </div>
      <SearchBar />
    </div>
  );
};

export default Topbar;
