import { Request } from '@components';
import { RootState } from '@stores/app';
import { useSelector } from 'react-redux';

const ListRequest = () => {
  // const [listRequests, setListRequests] = useState<Array<any>>([]);
  const listRequests = useSelector<RootState>((state) => state.requestSlice.friendRequest) as any;

  // useSubscribe('publish/requests.SEND_REQUEST', (payload) => {
  //   toast('success', payload.message);
  //   const { id, email, avatar, name } = payload.userRequest;
  //   const newRequest = {
  //     _id: payload._id,
  //     userRequest: {
  //       id,
  //       email,
  //       avatar,
  //       name,
  //     },
  //     userReceive: {
  //       id: payload.userReceive,
  //       email: user.email,
  //       name: user.name,
  //       avatar: user.avatar,
  //     },
  //     isPending: true,
  //     isAccept: false,
  //     isReject: false,
  //   };
  //
  //
  //   dispatch(update([...listRequests, newRequest]));
  // });
  // const { data: dataRequest, error } = useQuery(queryRequest, {
  //   variables: {
  //     request: {
  //       isPending: true,
  //       isAccept: false,
  //       isReject: false,
  //     },
  //   },
  // });
  //
  // useEffect(() => {
  //   if (dataRequest) {
  //     // setListRequests(requests);
  //     dispatch(update(dataRequest.getRequests));
  //   }
  // }, [dataRequest]);

  // const listRequests =
  // if (error) {
  //
  // }
  // if (data) {
  //
  // }
  return (
    <div className="fixed top-1/6 right-3 z-30 ml-24 h-3/6 px-3 backdrop-blur-md max-w-sm  rounded-xl hidden xl:block">
      <div className="ml-2">
        <div className="uppercase text-xl border-b pb-3  w-24 whitespace-nowrap h-11">
          <span className="text-white">Request</span>
        </div>
      </div>
      <div className="list-friends h-full overflow-scroll">
        {listRequests?.map((request) => (
          <Request key={request._id} data={request} />
        ))}
      </div>
    </div>
  );
};
export default ListRequest;
