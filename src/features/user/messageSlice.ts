import { createSlice } from '@reduxjs/toolkit';

type StateSlice = {
  messages: any[];
};
const initialState = {
  messages: [],
} as StateSlice;

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    pushMessages(state, action) {
      return { ...state, messages: action.payload };
    },
  },
});

export const { pushMessages } = messageSlice.actions;
export default messageSlice.reducer;
