import consts from "./constants";

const defaultState = {
  isUserLoggedIn: false,
  usersList: [],
  isLoginPage: true,
  message: [],
  errors: [],
  courses: [],
  userList: {},
  username: "",
  password: "",
  loaded: false
};

const reducer = (state = defaultState, action) => {
  let newState = state;
  switch (action.type) {
    case consts.APPLICATION_INIT_SUCCESS:
      newState = { ...state, isUserLoggedIn: action.payload.isUserLoggedIn };
      break;
    case consts.USER_LOGIN_SUCCESS:
      newState = { ...state, isUserLoggedIn: action.payload.success };
      break;
    case consts.USER_LOGIN_FAILED:
      newState = {
        ...state,
        errors: [action.payload.message]
      };
      break;
    case consts.USER_REGISTER_SUCCESS:
      newState = { ...state, message: [action.payload.message] };
      break;
    case consts.APP_PAGECHANGER_SUCCESS:
      newState = { ...state, isLoginPage: action.payload.status };
      break;
    case consts.APPLICATION_FETCH_USERS_SUCCESS:
      newState = {
        ...state,
        usersList: action.payload.data
      };
      break;
    case consts.APPLICATION_FETCH_COURSES_SUCCESS:
      newState = {
        ...state,
        courses:action.payload.data,
        username:action.payload.username,
        password:action.payload.password,
        loaded:action.payload.loaded
      };
      break;
    case consts.APPLICATION_FETCH_COURSES_FAILED:
      newState = { errors: [action.payload.message] };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
export default reducer;
