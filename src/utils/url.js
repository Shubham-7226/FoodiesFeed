export const API_URL = 'https://7e1f-103-240-35-190.ngrok.io';

export const REGISTER = `${API_URL}/users`;
export const GET_USER = `${API_URL}/users/self`;
export const LOGOUT = `${API_URL}/logout`;
export const LOGIN = `${API_URL}/login`;
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/users/profilepicture`;
export const CREATE_POST = `${API_URL}/posts`;
export const FORGOT_PASSWORD = `${API_URL}/forgot-password`;
export const CHANGE_PASSWORD = `${API_URL}/change-password`;
export const GET_SELF_POSTS = `${API_URL}/posts/users/`;
export const GET_FOLLOWING_POSTS = `${API_URL}/posts/user/following`;
export const GET_SINGLE_POST = `${API_URL}/posts/`;
export const SEARCH_USER = `${API_URL}/search/users?user=`;
export const GET_USER_FOLLOWERS = `${API_URL}/users/`;
export const GET_USER_FOLLOWINGS = `${API_URL}/users/`;
export const GET_SEARCHED_USER = `${API_URL}/users/`;
export const LIKE_POST = `${API_URL}/posts/`;
export const FOLLOW_USER = `${API_URL}/users/follow/`;
export const UNFOLLOW_USER = `${API_URL}/users/unfollow/`;
export const ADD_STORY = `${API_URL}/story`;
export const GET_FOLLOWING_STORY = `${API_URL}/story/users/following`;
export const GET_COMMENTS = `${API_URL}/users/post/`;
export const ADD_COMMENT = `${API_URL}/users/post/`;
