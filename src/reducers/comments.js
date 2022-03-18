import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_COMMENTS
} from '../constants/actions';

const initialState = {
  currentPostComments: []
};

const commentsReducer = (state = initialState, action) => {
  let tmp = [...state.currentPostComments];
  let payload = action.payload;
  const type = action.type;
  switch (type) {
    case ADD_COMMENT:
      tmp = [payload, ...tmp];
      break;
    case REMOVE_COMMENT:
      const toRemoveId = payload;
      const index = tmp.findIndex((comment) => comment.id === toRemoveId);
      if (index !== -1) {
        tmp.splice(index, 1);
      }
      break;
    case SET_COMMENTS:
      tmp = payload;
      break;
  }
  return {
    ...state,
    currentPostComments: tmp
  };
};

export default commentsReducer;
