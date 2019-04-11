import React from "react";
import { connect } from 'react-redux';
import { doLogin } from '../../Store/actions'

const Login = ({ doLogin, errors }) => {
  const loginHandler = (event) => {
    event.preventDefault();
    let userEmail = document.querySelector('#userLoginEmail').value;
    let userPassword = document.querySelector('#userLoginPassword').value;
    doLogin({
      userEmail,
      userPassword
    })
  }
  return (
    <React.Fragment>
      <section className="section-login">
        <div className="row">
          <div className="login">
            <div className="login__form">
              <form action="#" className="form">
                <div className="u-margin-bottom-medium">
                  <h2 className="heading-secondary">
                    وارد شوید
                  </h2>
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
                  <button className="btn btn--green" onClick={(event) => { loginHandler(event) }}>وارد شوید ←</button>
                </div>

                <div className="u-center-text">
                  <p>
                    حساب کاربری ندارید ؟
                    <a
                      href="/"
                      className="btn-text u-center-text"
                    >
                      ایجاد
                    </a>
                    حساب کاربری
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const mapState = state => {
  return {
    errors: state.errors
  }
};
const mapDispatch = dispatch => {
  return {
    doLogin: (userCredential) => dispatch(doLogin(userCredential))
  }
}

export default connect(mapState, mapDispatch)(Login);
