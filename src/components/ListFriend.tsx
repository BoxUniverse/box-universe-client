import React from 'react';
import Friend from '@components/Friend';
import { IoSearchOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '@stores/app';

const ListFriend = () => {
  const user = useSelector<RootState>((state) => state.userSlice.user) as any;

  return (
    <div className="fixed bottom-1 w-1/5  z-30 ml-24 h-5/6 px-3 backdrop-blur-md  rounded-xl hidden md:block max-w-xs">
      <div className="mt-1 ml-2">
        <div className="uppercase text-xl border-b pb-3 h-11 w-24 whitespace-nowrap">
          <span className="text-white">FRIENDS</span>
        </div>
      </div>

      <div className="mt-5 w-full flex items-center relative ">
        <input
          name="search"
          placeholder="Search Friend"
          id="username"
          className="placeholder:select-none neon text-lg align-middle placeholder:text-sm placeholder:uppercase  h-12 bg-transparent rounded-lg focus: outline-0 w-full pl-10 border-box border-purple-500 "
          autoComplete="off"
          spellCheck="false"
        />
        <IoSearchOutline
          color="white"
          className="absolute top-1/2 transform -translate-y-1/2 ml-3 "
          size={20}
        />
      </div>
      <div className="list-friends h-full overflow-scroll pb-56">
        {user?.friends && user.friends.map((friend) => <Friend key={friend.id} info={friend} />)}
      </div>
    </div>
  );
};
export default ListFriend;
