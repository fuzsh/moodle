import { put, call, takeEvery, takeLatest, all } from "redux-saga/effects";
import consts from "./constants";
import axios from "axios";

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
  try {
    let result = yield call(() => {
      axios
        .post("/post", action.payload)
        .then(res => {
          // console.log(res.data);
        })
        .catch(err => {
          throw err;
        });
    });
    yield put({
      type: consts.USER_REGISTER_SUCCESS,
      payload: { success: true, message: "hi" }
    });
  } catch (error) {
    yield put({
      type: consts.USER_REGISTER_FAILED,
      payload: { success: false, error: error.message }
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

export default function* sagaApi() {
  return yield all([
    applicationInitWatcher(),
    userLoginWatcher(),
    userReistergWatcher(),
    appPageChangerWatcher()
  ]);
}
