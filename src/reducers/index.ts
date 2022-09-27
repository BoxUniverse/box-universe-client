import appSlice from '@features/app/appSlice';
import userSlice from '@features/user/userSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appSlice,
  userSlice,
});

export default rootReducer;
