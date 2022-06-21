export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_REGISTER = 'SET_USER_REGISTER';
export const SET_USER_LOG_OUT = 'SET_USER_LOG_OUT';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const GET_USER_INFO = 'GET_USER_INFO';

export const loginUser = ({input, userToken, userImage, userId}) => {
  console.log('in action', userToken);
  return {
    type: 'SET_USER_LOGIN',
    payload: {input, userImage, userId},
    token: userToken,
  };
};
export const getUserInfo = ({userToken, userImage, userId}) => {
  console.log('in action', userToken);
  return {
    type: 'GET_USER_INFO',
    payload: {userImage, userId},
    token: userToken,
  };
};
export const registerUser = ({input, userToken, userImage, userId}) => {
  console.log('in action', userToken);
  return {
    type: 'SET_USER_REGISTER',
    payload: input,
    payload: {input, userImage, userId},
    token: userToken,
  };
};

export const logoutUser = () => {
  console.log('in action of logout');
  return {type: 'SET_USER_LOG_OUT'};
};

export const uploadImage = ({image}) => {
  console.log('in action of uploadImage', image);
  return {type: SET_USER_IMAGE, payload: image};
};
