import { createSlice } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image';

type ModalState = {
  modalViewImage: {
    image: StaticImageData;
    isOpen: boolean;
  };
  modalListFriendConversation: {
    isOpen: boolean;
  };

  modalListFriend: {
    isOpen: boolean;
  };
  modalListRequest: {
    isOpen: boolean;
  };
  modalListConversation: {
    isOpen: boolean;
  };
  modalCallVideo: {
    payload: any;
    isOpen: boolean;
    receiverAccept?: boolean;
  };
  modalComment: {
    isOpen: boolean;
    post: any;
  };

  isOpen: boolean;
};
const initialState = {
  modalViewImage: {
    image: null,
    isOpen: false,
  },
  modalListFriendConversation: {
    isOpen: false,
  },

  modalListFriend: {
    isOpen: false,
  },

  modalListRequest: {
    isOpen: false,
  },
  modalCallVideo: {
    payload: null,
    isOpen: false,
    receiverAccept: false,
  },
  modalComment: {
    isOpen: false,
    post: null,
  },
} as ModalState;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    updateModal(state, action: any) {
      return { ...state, [`${action.payload.name}`]: { ...action.payload } };
    },

    closeModal(state, action: any) {
      return { ...state, [`${action.payload.name}`]: { isOpen: false } };
    },
    openModal(state, action: any) {
      return { ...state, [`${action.payload.name}`]: { isOpen: true } };
    },
  },
});

export const { closeModal, openModal, updateModal } = modalSlice.actions;
export default modalSlice.reducer;
