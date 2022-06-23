export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_REGISTER = 'SET_USER_REGISTER';
export const SET_USER_LOG_OUT = 'SET_USER_LOG_OUT';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const GET_OTHER_USER = 'GET_OTHER_USER';

export const loginUser = ({input, userToken, userImage, userId}) => {
  console.log('in action login', userToken);
  return {
    type: 'SET_USER_LOGIN',
    payload: {input, userImage, userId},
    token: userToken,
  };
};
export const setUserToken = ({isUserLoggedin}) => {
  console.log('in action set usertoken', isUserLoggedin);
  return {
    type: 'SET_USER_TOKEN',
    token: isUserLoggedin,
  };
};
export const getUserInfo = ({userToken, image, userId}) => {
  console.log('in action get user info', userToken);
  return {
    type: 'GET_USER_INFO',
    payload: {image, userId},
    token: userToken,
  };
};
export const registerUser = ({input, userToken, userImage, userId}) => {
  console.log('in action register user', userToken);
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

export const getOtherUser = (followers, followings) => {
  console.log('getOtherUser', followers, followings);
  return {
    type: GET_OTHER_USER,
    payload: {
      followers: followers,
      followings: followings,
    },
  };
};
