import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

import {
  SET_USER_LOGIN,
  SET_USER_REGISTER,
  SET_USER_LOG_OUT,
  SET_USER_IMAGE,
  GET_USER_INFO,
  SET_USER_TOKEN,
} from '../actions/index';

const initialState = {
  user: {
    name: '',
    userName: '',
    email: '',
    token: null,
    image: '',
    userId: '',
  },
};

const userReducer = (state = initialState, action) => {
  // const {user} = state;
  switch (action.type) {
    case SET_USER_LOGIN:
      // AsyncStorage.setItem('token', JSON.stringify(action.token));
      console.log('in login', action);

      // console.log('storing token in async', token);
      const jsonValue = JSON.stringify(action.token);
      AsyncStorage.setItem('userToken', jsonValue);
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.input.email,
          token: action.token,
          image: action.payload.userImage,
          userId: action.payload.userId,
        },
      };

    case SET_USER_TOKEN:
      // AsyncStorage.setItem('token', JSON.stringify(action.token));
      console.log('in set user token', action);

      // console.log(action);
      return {
        ...state,
        user: {
          ...state.user,
          token: action.token,
        },
      };
    case GET_USER_INFO:
      // AsyncStorage.setItem('token', JSON.stringify(action.token));
      console.log('in get user info of reducer', state.user);

      // console.log(action);
      return {
        ...state,
        user: {
          ...state.user,
          token: action.token,
          image: action.payload.image,
          userId: action.payload.userId,
        },
      };
    case SET_USER_IMAGE:
      console.log('in set user image', typeof action.payload);
      // console.log('in set image', user);
      return {
        ...state,
        user: {
          ...state.user,
          image: action.payload,
        },
      };

    case SET_USER_REGISTER:
      // AsyncStorage.setItem('token', action.token);
      let valuejson = JSON.stringify(action.token);
      AsyncStorage.setItem('userToken', valuejson);
      console.log('in reducer', action);
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.input.email,
          name: action.payload.name,
          userName: action.payload.username,
          token: action.token,
          image: action.payload.userImage,
          userId: action.payload.userId,
        },
      };

    case SET_USER_LOG_OUT:
      AsyncStorage.removeItem('userToken');
      // console.log('in reducer expecting null', AsyncStorage.getItem('token'));
      // const {user} = state;
      return {
        ...state,
        user: {
          ...state.user,
          email: '',
          name: '',
          userName: '',
          token: null,
          image: '',
          userId: '',
        },
      };

    default:
      return state;
  }
};
const reducer = combineReducers({
  user: userReducer,
});
export {reducer};
