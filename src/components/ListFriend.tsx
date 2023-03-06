import { Friend } from '@components';
import { RootState } from '@stores/app';
import { useSelector } from 'react-redux';

const ListFriend = () => {
  const user = useSelector<RootState>((state) => state.userSlice.user) as any;

  return (
    <div className="fixed bottom-1 w-1/5  z-30 ml-24 h-5/6 px-3 backdrop-blur-md  rounded-xl hidden md:block max-w-xs">
      <div className="mt-1 ml-2">
        <div className="uppercase text-xl border-b pb-3 h-11 w-24 whitespace-nowrap">
          <span className="text-white">FRIENDS</span>
        </div>
      </div>

      <div className="list-friends h-full overflow-scroll pb-56">
        {user?.friends && user.friends.map((friend) => <Friend key={friend.id} info={friend} />)}
      </div>
    </div>
  );
};
export default ListFriend;
