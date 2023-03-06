import { createSlice } from '@reduxjs/toolkit';

type FriendRequestState = {
  friendRequest?: Array<object>;
};
const initialState = {
  friendRequest: [],
} as FriendRequestState;

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    updateRequest(state, action) {
      return { ...state, friendRequest: action.payload };
    },
  },
});

export const { updateRequest } = requestSlice.actions;
export default requestSlice.reducer;
