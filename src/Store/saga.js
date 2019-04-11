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
  try {
    let { userEmail, userPassword } = action.payload;
    let result = yield call(() => {
      if (userEmail === "aaa@gmail.com" && userPassword === "123456") {
        localStorage.setItem("isUserLoggedIn", true);
        return true;
      }
      throw new Error("Fuck All");
    });
    yield put({
      type: consts.USER_LOGIN_SUCCESS,
      payload: { success: result }
    });
  } catch (error) {
    yield put({
      type: consts.USER_LOGIN_FAILED,
      payload: { success: false, error: error.message }
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

export default function* sagaApi() {
  return yield all([
    applicationInitWatcher(),
    userLoginWatcher(),
    userReistergWatcher()
  ]);
}
