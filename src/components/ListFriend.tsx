import { Friend } from '@components';
import { RootState } from '@stores/app';
import { useSelector } from 'react-redux';

const ListFriend = () => {
  const user = useSelector<RootState>((state) => state.userSlice.user) as any;

  return (
    <div className="fixed bottom-1 xs:hidden sm:flex sm:justify-center sm:flex-col sm:items-center  xl:block  sm:w-24 xl:w-72 w-fit z-30 ml-24 h-5/6 sm:px-1 lg:px-3 hidden backdrop-blur-md rounded-xl ">
      <div className="xl:mt-1 xl:ml-2">
        <div className="uppercase text-xl border-b pb-3 h-11 w-fit xl:w-24 whitespace-nowrap">
          <span className="text-white">FRIENDS</span>
        </div>
      </div>

      <div className="list-friends h-full overflow-scroll pb-56 flex flex-col items-center sm:block">
        {user?.friends && user.friends.map((friend) => <Friend key={friend.id} info={friend} />)}
      </div>
    </div>
  );
};
export default ListFriend;
