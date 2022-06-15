export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_REGISTER = 'SET_USER_REGISTER';
export const SET_USER_LOG_OUT = 'user/SET_USER_LOG_OUT';

export const registerUser = ({input, userToken}) =>
  // {user}
  ({
    type: 'SET_USER_LOGIN',
    payload: input,
    token: userToken,
  });
