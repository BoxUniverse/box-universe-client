import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  user?: any;
};
const initialState = {
  user: {},
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update(state, action: any) {
      return { ...state, user: action.payload };
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
