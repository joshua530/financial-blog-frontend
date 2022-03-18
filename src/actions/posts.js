import {
  ADD_TO_INDEX,
  DELETE_FROM_INDEX,
  SET_POST_BEING_VIEWED,
  UPDATE_POST_BEING_VIEWED
} from '../constants/actions';

export const indexPost = (post) => {
  const cleanedPost = { postSlug: post.slug, userSlug: post.userSlug };
  return {
    type: ADD_TO_INDEX,
    payload: cleanedPost
  };
};

export const unindexPost = (postSlug) => {
  return {
    type: DELETE_FROM_INDEX,
    payload: postSlug
  };
};
