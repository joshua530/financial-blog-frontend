import { ADD_TO_INDEX, DELETE_FROM_INDEX } from '../constants/actions';

const initialState = {
  postsIndex: []
};

const postReducer = (state = initialState, action) => {
  if (action.type === ADD_TO_INDEX) {
    // ensure post does not exist to avoid duplication
    const postSlug = action.payload.postSlug;
    let existingIndex = state.postsIndex.findIndex((p) => {
      return p.postSlug === postSlug;
    });

    if (existingIndex === -1) {
      let newIndex = [...state.postsIndex];
      newIndex.push(action.payload);
      return {
        ...state,
        postsIndex: newIndex
      };
    }
  } else if (action.type === DELETE_FROM_INDEX) {
    const slug = action.payload.postSlug;
    let itemIndex = state.postsIndex.findIndex((p) => p.postSlug === slug);

    if (itemIndex !== -1) {
      let newIndex = [...state.postsIndex];
      newIndex.splice(itemIndex, 1);
      return {
        ...state,
        postsIndex: newIndex
      };
    }
  }
  return state;
};

export default postReducer;
