import React from "react";
import lifecycle from 'react-pure-lifecycle'

import { connect } from "react-redux";
import { doRegister, routerRegisterLogin } from "../../Store/actions";

const methods = {
  componentDidMount() {
    let x = document.getElementsByClassName("tab");
    x[0].style.display = "block";
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").innerHTML = "← ادامه";
  }
};

const Register = ({ doRegister, goToLogin, errors, message }) => {
  let currentTab = 0;
  const showTab = (n) => {
    let x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n === 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "ثبت نام";
    } else {
      document.getElementById("nextBtn").innerHTML = " ← ادامه";
    }
  }
  const nextPageHandler = (event, n) => {
    event.preventDefault();
    let x = document.getElementsByClassName("tab");
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
      RegisterHandler(event)
      return false;
    }
    showTab(currentTab);
  }
  const RegisterHandler = event => {
    //event.preventDefault();
    let username = document.querySelector('#userName').value;
    let password = document.querySelector("#userRegisterPassword").value;
    let firstname = document.querySelector("#firstName").value;
    let lastname = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;

    doRegister({
      username,
      password,
      firstname,
      lastname,
      email
    });
  };

  const goToLoginHandler = () => {
    let status = true;
    goToLogin({
      status
    });
  };

  return (
    <div className="enter enter__register">
      <div className="enter__form">
        <form action="#" className="form" id="regForm">
          <div className="u-margin-bottom-medium">
            <h2 className="heading-secondary">ثبت‌نام کنید</h2>
          </div>
          <div className="tab" style={{ display: "none" }}>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                placeholder="نام کابری"
                id="userName"
                required
              />
              <label htmlFor="InputText" className="form__label">
                نام کاربری
        </label>
            </div>
            <div className="form__group">
              <input
                type="password"
                className="form__input"
                placeholder="کلمه عبور"
                id="userRegisterPassword"
                required
              />
              <label htmlFor="InputPassword" className="form__label">
                کلمه عبور
        </label>
            </div>
          </div>
          <div className="tab" style={{ display: "none" }}>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                placeholder="نام"
                id="firstName"
                required
              />
              <label htmlFor="InputTextFirstName" className="form__label">
                نام
        </label>
            </div>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                placeholder="نام خانوادگی"
                id="lastName"
                required
              />
              <label htmlFor="InputText" className="form__label">
                نام خانوادگی
        </label>
            </div>
          </div>
          <div className="tab" style={{ display: "none" }}>
            <div className="form__group" id="email">
              <input
                type="email"
                className="form__input"
                placeholder="رایانامه"
                id="email"
                required
              />
              <label htmlFor="InputEmail" className="form__label">
                رایانامه
        </label>
            </div>
            <div className="form__group" id="email">
              <input
                type="email"
                className="form__input"
                placeholder="رایانامه"
                id="email"
                required
              />
              <label htmlFor="InputEmail" className="form__label">
                رایانامه
        </label>
            </div>

          </div>

          <div className="form__group" style={{ display: "inline-block" }}>
            <button className="btn btn--green" id="nextBtn" onClick={event => { nextPageHandler(event, 1) }}>
              ادامه ←
        </button>
          </div>
          <div className="form__group" style={{ display: "inline-block" }}>
            <button className="btn btn--green" id="prevBtn" onClick={event => { nextPageHandler(event, -1) }}>
              قبلی →
        </button>
          </div>

          {errors && <div className="u-center-text" style={{ color: "red" }}>
            <p>
              {errors}
            </p>
          </div>}

          {message && <div className="u-center-text" style={{ color: "red" }}>
            <p>
              {message}
            </p>
          </div>}
          <div className="u-center-text">
            <p>
              حساب کاربری دارید ؟
          <a
                href="javascript:void(0)"
                className="btn-text u-center-text"
                onClick={() => {
                  goToLoginHandler();
                }}
              >
                وارد
          </a>
              شوید
        </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    errors: state.errors,
    message: state.message,
  };
};
const mapDispatch = dispatch => {
  return {
    doRegister: userCredential => dispatch(doRegister(userCredential)),
    goToLogin: status => {
      dispatch(routerRegisterLogin(status));
    }
  };
};

export default connect(mapState, mapDispatch)(lifecycle(methods)(Register));
