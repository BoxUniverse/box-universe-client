import React, { useEffect, useState } from 'react';
import { result } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '@stores/app';
import { updateModal } from '@features/app';

type Props = {
  info: any;
};
type PropsPost = {
  isOwnPost: boolean;
  userAction: string;
  post: any;
  action: string;
};

const NotificationText = ({ isOwnPost, userAction, post, action }: PropsPost) => {
  return (
    <div className={'py-2 ml-2'}>
      {isOwnPost ? (
        <span>
          <b>{userAction} </b> commented on your post
        </span>
      ) : (
        <span>
          <b>{userAction} </b> {action}ed on {post.profile.name}&apos;s post that you&apos;re
          following
        </span>
      )}
    </div>
  );
};
const Notification = ({ info }: Props) => {
  const [resultUserAction, setResult] = useState<string>('');
  const [isOwnPost, setOwn] = useState(false);

  const dispatch = useDispatch<StoreDispatch>();
  const user: any = useSelector<RootState>((state) => state.userSlice.user);
  const replaceAt = function (str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };

  const showModalComment = () => {
    dispatch(
      updateModal({
        name: 'modalComment',
        isOpen: true,
        post: info.post,
      } as any),
    );
  };

  useEffect(() => {
    length = info.groupUserAction.length;
    const groupUserAction = info.groupUserAction.map((user) => user.name);
    setOwn(info.post.profile.id === user.id);
    if (length <= 2) {
      setResult(groupUserAction.join(' and '));
    } else if (length >= 3) {
      // 1, 2 and 3
      // 1 and others 2 3 4
      // 1,2 and 3 others
      if (length === 3) {
        let resultJoin = groupUserAction.join(', ');
        const indexLastComma = resultJoin.lastIndexOf(',');
        resultJoin = replaceAt(resultJoin, indexLastComma, ' and');
        setResult(resultJoin);
      } else {
        const divider = Math.floor(length / 2) - 1 >= 3 ? 3 : Math.floor(length / 2) - 1;

        const first = groupUserAction.slice(0, divider);
        const firstJoin = [first.join()];
        const secondJoin = [`${groupUserAction.slice(divider).length - first.length} others`];
        const resultJoin = firstJoin.concat(secondJoin).join(' and ');
        setResult(resultJoin);
      }
    }
  }, []);

  return (
    <div
      className={'xl:w-5/6 w-full my-2 bg-green-500 rounded-md last:mb-32 cursor-pointer'}
      onClick={showModalComment}>
      <NotificationText
        isOwnPost={isOwnPost}
        userAction={resultUserAction}
        post={info.post}
        action={info.action}
      />
    </div>
  );
};

export default Notification;
