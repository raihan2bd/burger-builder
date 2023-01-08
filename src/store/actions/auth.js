import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = (expiratinonTime) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiratinonDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiratinonTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout(expiratinonTime));
    }, expiratinonTime * 1000);
  };
};

export const auth = (email, password, isSingIn) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = "Place your api firebase url in here";

    if (isSingIn) {
      url = "Place your sign in url in here";
    }

    axios
      .post(url, authData)
      .then((response) => {
        const expiratinonDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiratinonDate", expiratinonDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiratinonDate = localStorage.getItem("expiratinonDate");

      const userId = localStorage.getItem("userId");
      if (expiratinonDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));

        const expiratinonTime =
          (new Date(expiratinonDate).getTime() - new Date().getTime()) / 1000;

        dispatch(checkAuthTimeout(expiratinonTime));
      }
    }
  };
};
