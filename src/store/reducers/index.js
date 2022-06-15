import {combineReducers} from 'redux';
import {
  SET_USER_LOGIN,
  SET_USER_REGISTER,
  SET_USER_LOG_OUT,
} from '../actions/index';

const initialState = {
  user: {
    name: null,
    userName: null,
    email: null,
    token: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN:
      const {user} = state;
      console.log(action);
      return {
        ...user,
        email: action.payload.email,
        token: action.token,
      };

    case SET_USER_LOG_OUT:
      return {
        userName: null,
        userEmail: null,
        userToken: null,
        registerd: false,
      };

    default:
      return state;
  }
};
const reducer = combineReducers({
  user: userReducer,
});
export {reducer};
