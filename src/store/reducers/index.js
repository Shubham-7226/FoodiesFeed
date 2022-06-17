import {combineReducers} from 'redux';
import {
  SET_USER_LOGIN,
  SET_USER_REGISTER,
  SET_USER_LOG_OUT,
} from '../actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: {
    name: '',
    userName: '',
    email: '',
    token: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN:
      // const {user} = state;
      AsyncStorage.setItem('token', JSON.stringify(action.token));
      // console.log(
      //   '----------------------------',
      //   AsyncStorage.getItem('token'),
      // );
      console.log(action);
      return {
        ...state.user,
        email: action.payload.email,
        token: action.token,
      };

    case SET_USER_REGISTER:
      // const {user} = state;
      AsyncStorage.setItem('token', action.token);
      console.log('in reducer', action);
      return {
        ...state.user,
        email: action.payload.email,
        name: action.payload.name,
        userName: action.payload.username,
        token: action.token,
      };

    case SET_USER_LOG_OUT:
      AsyncStorage.removeItem('token');
      console.log('in reducer expecting null', AsyncStorage.getItem('token'));
      return {
        // ...state.user,
        email: '',
        name: '',
        userName: '',
        token: '',
      };

    default:
      return state;
  }
};
const reducer = combineReducers({
  user: userReducer,
});
export {reducer};
