import consts from "./constants";

const defaultState = {
  isUserLoggedIn: false,
  isLoginPage: true,
  message: [],
  errors: []
};

const reducer = (state = defaultState, action) => {
  let newState = state;
  switch (action.type) {
    case consts.APPLICATION_INIT_SUCCESS:
      newState = { ...state, isUserLoggedIn: action.payload.isUserLoggedIn };
      break;
    case consts.USER_LOGIN_SUCCESS:
      newState = { ...state, isUserLoggedIn: true };
      break;
    case consts.USER_LOGIN_FAILED:
      newState = {
        ...state,
        errors: [...state.errors, action.payload.message]
      };
      break;
    case consts.USER_REGISTER_SUCCESS:
      newState = { ...state, message: [action.payload.message] };
      break;
    case consts.APP_PAGECHANGER_SUCCESS:
      newState = { ...state, isLoginPage: action.payload.status };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
export default reducer;
