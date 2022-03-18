import { AUTHENTICATE, DEAUTHENTICATE } from '../constants/actions';

const authToken = localStorage.getItem('authToken');
const userSlug = localStorage.getItem('userSlug');
const isAuthenticated = authToken !== null && userSlug !== null;

const initialState = {
  isAuthenticated,
  userSlug,
  authToken
};

const authReducer = (state = initialState, action) => {
  if (action.type === DEAUTHENTICATE) {
    localStorage.removeItem('userSlug');
    localStorage.removeItem('authToken');
    return {
      ...state,
      isAuthenticated: false,
      userSlug: null,
      authToken: null
    };
  } else if (action.type === AUTHENTICATE) {
    const tok = action.payload.authToken;
    const slug = action.payload.userSlug;
    localStorage.setItem('authToken', tok);
    localStorage.setItem('userSlug', slug);
    return {
      ...state,
      isAuthenticated: true,
      userSlug: slug,
      authToken: tok
    };
  }
  return state;
};

export default authReducer;
