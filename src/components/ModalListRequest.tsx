import { useLazyQuery, useMutation } from '@apollo/client';
import { Input, Modal, Request } from '@components';
import { usePublish } from '@hooks';
import { Avatar } from '@mui/material';
import { ADD_MEMBER_CONVERSATION, GET_LIST_FRIEND_NOT_IN_CONVERSATION } from '@src/graphql';
import { RootState } from '@stores/app';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import { useSelector } from 'react-redux';

export const ModalListRequest = () => {
  const { modalListRequest }: any = useSelector<RootState>((state) => state.modalSlice);

  const listRequests = useSelector<RootState>((state) => state.requestSlice.friendRequest) as any;

  if (modalListRequest.isOpen) {
    return (
      <Modal
        name="modalListRequest"
        width="w-full"
        height="h-screen"
        closeable={true}
        title={'REQUEST'}
        overlay={true}
        style={{ zIndex: 9999, backgroundColor: '#000000a3' }}>
        <div className=" rounded-2xl  w-fit h-full text-white flex justify-center opacity-100 p-10 flex-col">
          <div className="ml-2">
            <div className="uppercase text-xl border-b pb-3  w-24 whitespace-nowrap h-11 ">
              <span className="text-white">Request</span>
            </div>
          </div>
          <div className="list-friends h-full overflow-scroll">
            {listRequests?.map((request) => (
              <Request key={request._id} data={request} />
            ))}
          </div>
        </div>
      </Modal>
    );
  }
};

export default ModalListRequest;
