import consts from "./constants";

export const applicationInit = payload => {
  return {
    type: consts.APPLICATION_INIT_REQUESTED,
    payload
  };
};

export const doLogin = payload => {
  return {
    type: consts.USER_LOGIN_REQUESTED,
    payload
  };
};

export const doRegister = payload => {
  return {
    type: consts.USER_REGISTER_REQUESTED,
    payload
  };
};
 
 export const routerRegisterLogin = payload => {
   return{
     type:consts.APP_PAGECHANGER_REQUESTED,
     payload
   }
 }

 export const fetchCourses = payload =>{
   return{
     type:consts.APPLICATION_FETCH_COURSES_REQUESTED,
     payload
   }
 }