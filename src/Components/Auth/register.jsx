import React from "react";
import { connect } from "react-redux";
import { doRegister, routerRegisterLogin } from "../../Store/actions";

const Register = ({ doRegister, goToLogin }) => {

  const RegisterHandler = event => {
    event.preventDefault();
    //let userName = document.querySelector('#userName').value;
    let userEmail = document.querySelector("#userLoginEmail").value;
    let userPassword = document.querySelector("#userLoginPassword").value;
    doRegister({
      //userName,
      userEmail,
      userPassword
    });
  };
  const goToLoginHandler = () => {
    let status = true;
    goToLogin({
      status
    });
  };

  return (
    <form action="#" className="form">
      <div className="u-margin-bottom-medium">
        <h2 className="heading-secondary">ثبت‌نام کنید</h2>
      </div>

      <div className="form__group">
        <input
          type="email"
          className="form__input"
          placeholder="رایانامه"
          id="userLoginEmail"
          required
        />
        <label htmlFor="InputEmail" className="form__label">
          رایانامه
        </label>
      </div>
      <div className="form__group">
        <input
          type="password"
          className="form__input"
          placeholder="کلمه عبور"
          id="userLoginPassword"
          required
        />
        <label htmlFor="InputPassword" className="form__label">
          کلمه عبور
        </label>
      </div>
      <div className="form__group">
        <button className="btn btn--green" onClick={event => { RegisterHandler(event) }}>
          ثبت‌نام ←
        </button>
      </div>

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
  );
};

const mapState = state => {
  return {
    errors: state.errors
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

export default connect(
  mapState,
  mapDispatch
)(Register);
