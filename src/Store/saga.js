import { put, call, takeEvery, all } from "redux-saga/effects";
import consts from "./constants";
import axios from "axios";
import jwt from "jsonwebtoken";

function* applicationInitWorker() {
  try {
    let isUserLoggedIn = yield call(() => {
      let isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
      return !!isUserLoggedIn;
    });
    yield put({
      type: consts.APPLICATION_INIT_SUCCESS,
      payload: { isUserLoggedIn }
    });
  } catch (error) {
    yield put({
      type: consts.APPLICATION_INIT_FAILED,
      payload: { error }
    });
  }
}
function* applicationInitWatcher() {
  yield takeEvery(consts.APPLICATION_INIT_REQUESTED, applicationInitWorker);
}

function* userLoginWorker(action) {
  let { userName, userPassword } = action.payload;
  try {
    let result = yield call(() => {
      return axios
        .post("http://localhost:5000/api/auth", {
          username: userName,
          password: userPassword
        })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("x-auth-token", response.data);
            localStorage.setItem("isUserLoggedIn", true);
          }
        });
    });
    yield put({
      type: consts.USER_LOGIN_SUCCESS,
      payload: { success: true }
    });
  } catch (ex) {
    console.log(ex.response.data);
    yield put({
      type: consts.USER_LOGIN_FAILED,
      payload: { success: false, message: ex.response.data }
    });
  }
}
function* userLoginWatcher() {
  yield takeEvery(consts.USER_LOGIN_REQUESTED, userLoginWorker);
}

function* userRegisterWorker(action) {
  let {
    firstname,
    lastname,
    username,
    email,
    password,
    grade
  } = action.payload;
  console.log(firstname);

  try {
    let result = yield call(() => {
      return axios.post("http://localhost:5000/api/users", {
        firstname,
        lastname,
        username,
        email,
        password,
        grade
      });
    });

    if (result) {
      yield put({
        type: consts.USER_REGISTER_SUCCESS,
        payload: { message: "ثبت نام شما با موفقیت انجام شد، وارد شوید ....!" }
      });
    }
  } catch (ex) {
    yield put({
      type: consts.USER_REGISTER_FAILED,
      payload: { message: ex.response.data }
    });
  }
}
function* userReistergWatcher() {
  yield takeEvery(consts.USER_REGISTER_REQUESTED, userRegisterWorker);
}

function* appPageChangerWorker(action) {
  let { status } = action.payload;
  yield put({
    type: consts.APP_PAGECHANGER_SUCCESS,
    payload: { status }
  });
}
function* appPageChangerWatcher() {
  yield takeEvery(consts.APP_PAGECHANGER_REQUESTED, appPageChangerWorker);
}

function* appFetchCoursesWorker() {
  try {
    const token = localStorage.getItem("x-auth-token");

    if (!token) throw new Error("no token Provided");

    const decodedToken = jwt.decode(token);

    if (decodedToken.isAdmin) {
      let adminResult = yield call(() => {
        return axios.get("http://localhost:5000/api/admin", {
          headers: { "x-auth-token": token }
        });
      });

      if (adminResult) {
        yield put({
          type: consts.APPLICATION_FETCH_USERS_SUCCESS,
          payload: { data: adminResult.data }
        });
      }
    }

    let userCourses = yield call(() => {
      return axios.get("http://localhost:5000/api/user", {
        headers: { "x-auth-token": token }
      });
    });
    if (userCourses) {
      const coursesList = userCourses.data;
      let courses = [];
      const { username, password } = coursesList.splice(-1, 1)[0];
      const filtered = coursesList.map(({ category }) => category);
      const uniq_filtered = filtered.filter(function(item, pos) {
        return filtered.indexOf(item) === pos;
      });
      const getCourses = category => {
        return coursesList.filter(course => course.category === category);
      };
      for (let i = 0; i < uniq_filtered.length; i++) {
        courses.push(getCourses(uniq_filtered[i]));
      }
      yield put({
        type: consts.APPLICATION_FETCH_COURSES_SUCCESS,
        payload: {
          data: courses,
          username: username,
          password: password,
          loaded: true
        }
      });
    }
  } catch (ex) {
    yield put({
      type: consts.APPLICATION_FETCH_COURSES_FAILED,
      payload: { message: ex.response.data }
    });
  }
}
function* appFetchCoursesWatcher() {
  yield takeEvery(
    consts.APPLICATION_FETCH_COURSES_REQUESTED,
    appFetchCoursesWorker
  );
}

export default function* sagaApi() {
  return yield all([
    applicationInitWatcher(),
    userLoginWatcher(),
    userReistergWatcher(),
    appPageChangerWatcher(),
    appFetchCoursesWatcher()
  ]);
}
