import {combineReducers} from 'redux';
import {
  SET_USER_LOGIN,
  SET_USER_REGISTER,
  SET_USER_LOG_OUT,
  SET_USER_IMAGE,
  GET_USER_INFO,
} from '../actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: {
    name: '',
    userName: '',
    email: '',
    token: '',
    image: '',
    userId: '',
  },
};

const userReducer = (state = initialState, action) => {
  // const {user} = state;
  switch (action.type) {
    case SET_USER_LOGIN:
      AsyncStorage.setItem('token', JSON.stringify(action.token));
      console.log('in login', state.user);

      // console.log(action);
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
          token: action.token,
          image: action.payload.userImage,
          userId: action.payload.userId,
        },
      };
    case GET_USER_INFO:
      // AsyncStorage.setItem('token', JSON.stringify(action.token));
      console.log('in login', state.user);

      // console.log(action);
      return {
        ...state,
        user: {
          ...state.user,
          token: action.token,
          image: action.payload.userImage,
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
      AsyncStorage.setItem('token', action.token);
      console.log('in reducer', action);
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
          name: action.payload.name,
          userName: action.payload.username,
          token: action.token,
          image: action.payload.userImage,
          userId: action.payload.userId,
        },
      };

    case SET_USER_LOG_OUT:
      AsyncStorage.removeItem('token');
      console.log('in reducer expecting null', AsyncStorage.getItem('token'));
      // const {user} = state;
      return {
        ...state,
        user: {
          ...state.user,
          email: '',
          name: '',
          userName: '',
          token: '',
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
