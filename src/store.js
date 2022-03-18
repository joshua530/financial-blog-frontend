import { createStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authentication';
import commentsReducer from './reducers/comments';
import postReducer from './reducers/posts';

const reducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  comments: commentsReducer
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
