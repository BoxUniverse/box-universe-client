import appSlice from '@features/app/appSlice';
import userSlice from '@features/user/userSlice';
import requestSlice from '@features/user/requestSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appSlice,
  userSlice,
  requestSlice,
});

export default rootReducer;
