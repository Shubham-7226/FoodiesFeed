export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_REGISTER = 'SET_USER_REGISTER';
export const SET_USER_LOG_OUT = 'SET_USER_LOG_OUT';

export const loginUser = ({input, userToken}) => {
  console.log('in action', userToken);
  return {type: 'SET_USER_LOGIN', payload: input, token: userToken};
};

export const registerUser = ({input, userToken}) => {
  console.log('in action', userToken);
  return {type: 'SET_USER_REGISTER', payload: input, token: userToken};
};

export const logoutUser = () => {
  console.log('in action of logout');
  return {type: 'SET_USER_LOG_OUT'};
};
