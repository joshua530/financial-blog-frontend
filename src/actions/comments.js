import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_COMMENTS
} from '../constants/actions';

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
};

export const removeComment = (id) => {
  return {
    type: REMOVE_COMMENT,
    payload: id
  };
};

export const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    payload: comments
  };
};
