import { Modal } from '@components';
import { usePublish, useSubscribe, useToast } from '@hooks';
import { closeModal, updateModal } from '@src/features/app/modalSlice';
import { RootState, StoreDispatch } from '@stores/app';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineCallEnd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import SimplePeer from 'simple-peer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalCallVideo = () => {
  const { modalCallVideo }: any = useSelector<RootState>((state) => state.modalSlice);

  const userVideo = useRef<any>({ srcObject: null });
  const partnerVideo = useRef<any>({ srcObject: null });
  useEffect(() => {
    if (modalCallVideo.isOpen && modalCallVideo.payload) {
      userVideo.current.srcObject = modalCallVideo.payload.userVideo;
      partnerVideo.current.srcObject = modalCallVideo.payload.partnerVideo;
    }
  }, [modalCallVideo]);
  // const [, setStream] = useState<MediaStream>(null);
  // const [peer, setPeer] = useState<SimplePeer.Instance>(null);
  // const user: any = useSelector<RootState>((state) => state.userSlice.user);
  // const [, setCallerSignal] = useState();
  //
  // const [caller, setCaller] = useState(null);
  // const [receiver, setReceiver] = useState(null);
  //
  // const dispatch = useDispatch<StoreDispatch>();
  // const { currentConversation }: any = useSelector<RootState>((state) => state.conversationSlice);
  // const toast = useToast();
  // const connectionRef = useRef(null);
  //
  // const MySwal = withReactContent(Swal);
  // useSubscribe('receiver.ACCEPT_CALL', (payload) => {
  //   setReceiver(payload.receiver);
  //
  //   peer.signal(payload.signalData);
  // });
  //
  // useSubscribe('receiver.REJECT_CALL', () => {
  //   dispatch(closeModal({ name: 'modalCallVideo' } as any));
  //   toast('warn', 'Receiver rejected the call');
  // });
  //
  // const publish = usePublish();
  //
  // const startCall = async () => {
  //   const stm = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //   setStream(stm);
  //   userVideo.current.srcObject = stm;
  //   const peer = new SimplePeer({
  //     initiator: true,
  //     stream: stm,
  //     trickle: false,
  //   });
  //
  //   setPeer(peer);
  //   setCaller({
  //     id: user.id,
  //     name: user.name,
  //     avatar: user.avatar,
  //   });
  //
  //   peer.on('signal', (data) => {
  //     alert('x');
  //     publish('messages.CALL', {
  //       conversation: currentConversation,
  //       signalData: data,
  //       caller: {
  //         id: user.id,
  //         name: user.name,
  //         avatar: user.avatar,
  //       },
  //     });
  //   });
  //   peer.on('stream', (stream) => {
  //     // if (partnerVideo.current) {
  //     partnerVideo.current.srcObject = stream;
  //
  //     // }
  //   });
  //   connectionRef.current = peer;
  // };
  //
  // useSubscribe('messages.USER_OFFLINE', () => {
  //   dispatch(
  //     updateModal({
  //       isOpen: false,
  //       receiverAccept: false,
  //       name: 'modalCallVideo',
  //     } as any),
  //   );
  //   toast('warn', 'User is offline');
  // });
  // useEffect(() => {
  //   if (modalCallVideo.isOpen && !modalCallVideo.receiverAccept) {
  //     void startCall();
  //   }
  // }, [modalCallVideo]);
  // // useEffect(() => {
  // //   if (modalCallVideo.isOpen) {
  // //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
  // //       setStream(stream);
  // //       userVideo.current.srcObject = stream;
  // //     });
  // //   }
  // // }, [modalCallVideo]);
  //
  // const afterCloseModalCallVideo = () => {
  //   publish('messages.SELF_REJECT', {
  //     conversation: currentConversation,
  //     caller: {
  //       id: user.id,
  //       name: user.name,
  //       avatar: user.avatar,
  //     },
  //   });
  // };
  //
  // useSubscribe('messages.SELF_REJECT', () => {
  //   MySwal.close();
  //   toast('warn', 'The call is rejected');
  //   dispatch(
  //     updateModal({
  //       isOpen: false,
  //       receiverAccept: false,
  //       name: 'modalCallVideo',
  //     } as any),
  //   );
  // });
  //
  // useSubscribe('messages.INCOMING_CALL', (payload) => {
  //   // dispatch(
  //   //   updateModalCallVideo({
  //   //     isOpen: true,
  //   //   }),
  //   // );
  //   setCallerSignal(payload.signalData);
  //
  //   const { caller } = payload;
  //
  //   setCaller(caller);
  //   setReceiver(user);
  //   MySwal.fire({
  //     confirmButtonColor: '#22c55e',
  //     cancelButtonColor: '#ef4444',
  //     title: ' Incoming Call',
  //     text: `${caller.name} is calling you ...`,
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, accept call',
  //     cancelButtonText: 'No, reject call!',
  //     color: 'white',
  //     background: '#000000a3',
  //     allowOutsideClick: false,
  //     timer: 100000,
  //     timerProgressBar: true,
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       dispatch(
  //         updateModal({
  //           isOpen: true,
  //           receiverAccept: true,
  //           name: 'modalCallVideo',
  //         } as any),
  //       );
  //       const stm = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //       userVideo.current.srcObject = stm;
  //       const peer = new SimplePeer({
  //         initiator: false,
  //         stream: stm,
  //         trickle: false,
  //       });
  //
  //       peer.on('signal', (data) => {
  //         // alert('receiver_accept');
  //
  //         publish('messages.ACCEPT_CALL', {
  //           receiver: {
  //             id: user.id,
  //             name: user.name,
  //             avatar: user.avatar,
  //           },
  //           signalData: data,
  //           caller,
  //         });
  //       });
  //
  //       peer.on('stream', (stream) => {
  //         partnerVideo.current.srcObject = stream;
  //       });
  //
  //       peer.signal(payload.signalData);
  //
  //       setPeer(peer);
  //
  //       connectionRef.current = peer;
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       publish('messages.REJECT_CALL', {
  //         receiver: {
  //           id: user.id,
  //           name: user.name,
  //           avatar: user.avatar,
  //         },
  //         caller,
  //       });
  //
  //       dispatch(
  //         updateModal({
  //           isOpen: false,
  //           name: 'modalCallVideo',
  //         } as any),
  //       );
  //     }
  //   });
  // });
  //
  // useSubscribe('messages.STOP_CALL', () => {
  //   toast('warn', 'The call is ended');
  //   dispatch(
  //     updateModal({
  //       isOpen: false,
  //       receiverAccept: false,
  //       name: 'modalCallVideo',
  //     } as any),
  //   );
  //   partnerVideo.current?.srcObject?.getTracks().forEach((track) => track.stop());
  //   userVideo.current?.srcObject?.getTracks().forEach((track) => track.stop());
  //
  //   connectionRef.current.destroy();
  // });

  // const handleStopCall = () => {
  //   publish('messages.STOP_CALL', {
  //     receiver,
  //     caller,
  //     userAction: user,
  //   });
  //   partnerVideo.current?.srcObject?.getTracks().forEach((track) => track.stop());
  //   userVideo.current?.srcObject?.getTracks().forEach((track) => track.stop());
  //   connectionRef.current.destroy();
  //
  //   dispatch(
  //     updateModal({
  //       isOpen: false,
  //       name: 'modalCallVideo',
  //       receiverAccept: false,
  //     } as any),
  //   );
  // };

  if (modalCallVideo.isOpen) {
    return (
      <Modal name="modalCallVideo" afterClose={() => {}} closeable={false}>
        <div className="border-purple-500  rounded-2xl w-fit flex items-center justify-center opacity-100 p-10 flex-col">
          <div className="caller absolute w-64 top-0 left-0">
            {<video className="my-video" playsInline muted ref={userVideo} autoPlay />}
          </div>

          <div className="receiver w-full h-full">
            {<video className="my-video w-full h-full" playsInline ref={partnerVideo} autoPlay />}
          </div>
          {/*{peer && (*/}
          {/*  <div className="mt-14 flex justify-center flex-row items-center gap-14">*/}
          {/*    <div*/}
          {/*      className="rounded-full w-16 h-16 bg-red-500 flex justify-center items-center cursor-pointer"*/}
          {/*      onClick={handleStopCall}>*/}
          {/*      <MdOutlineCallEnd color="white" size={40} />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </Modal>
    );
  }
};
export default ModalCallVideo;
