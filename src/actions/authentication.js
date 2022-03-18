import { AUTHENTICATE, DEAUTHENTICATE } from '../constants/actions';

export const deauthenticate = () => {
  return {
    type: DEAUTHENTICATE
  };
};

export const authenticate = (authToken, userSlug) => {
  return {
    type: AUTHENTICATE,
    payload: {
      authToken,
      userSlug
    }
  };
};
