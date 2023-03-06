import { createSlice } from '@reduxjs/toolkit';

type StateSlice = {
  currentConversation?: string;
  isGroup: boolean;
};
const initialState = {
  currentConversation: null,
  isGroup: null,
  name: null,
} as StateSlice;

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    changeConversation(state, action) {
      return { ...state, currentConversation: action.payload };
    },
    updateTypeConversation(state, action) {
      return { ...state, isGroup: action.payload };
    },
    updateConversation(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { changeConversation, updateConversation, updateTypeConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
