import appSlice from '@features/app/appSlice';
import userSlice from '@features/user/userSlice';
import requestSlice from '@features/user/requestSlice';
import conversationSlice from '@features/user/conversationSlice';
import messageSlice from '@features/user/messageSlice';
import modalSlice from '@features/app/modalSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appSlice,
  userSlice,
  requestSlice,
  conversationSlice,
  messageSlice,
  modalSlice,
});

export default rootReducer;
