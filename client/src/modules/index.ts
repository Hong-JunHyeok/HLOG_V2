import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import authReducer from './auth';
import modalReducer from './modal';
import postReducer from './post';

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
