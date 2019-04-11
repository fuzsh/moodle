import consts from "./constants";

export const applicationInit = payload => {
  return {
    type: consts.APPLICATION_INIT_REQUESTED,
    payload: payload
  };
};

export const doLogin = payload => {
  return {
    type: consts.USER_LOGIN_REQUESTED,
    payload: payload
  };
};

export const doRegister = payload => {
  return {
    type: consts.USER_REGISTER_REQUESTED,
    payload: payload
  };
};
 
 