import { httpClient } from "../utils/HttpClient";
import {
  LOGIN_FETCHING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  server,
  LOGOUT,
} from "./../constants";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload: any) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const setLoginLogoutToState = () => ({
  type: LOGOUT,
});

export const handleLogin = (account: any, navigate: any) => {
  return async (dispatch: any) => {
    dispatch(setLoginFetchingToState());
    const result = await httpClient.post(server.LOGIN_URL, account);
    if (result.data.result === "ok") {
      const { token } = result.data;
      localStorage.setItem(server.TOKEN_KEY, token);
      dispatch(setLoginSuccessToState(result.data));
      navigate("/stock");
    } else {
      dispatch(setLoginFailedToState());
    }
  };
};

export const handleReLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(server.TOKEN_KEY);
    if (token) {
      dispatch(setLoginSuccessToState({ token }))
    }
  }
}

export const handleLogout = (navigate: any) => {
  return (dispatch: any) => {
    localStorage.removeItem(server.TOKEN_KEY);
    localStorage.removeItem(server.REFRESH_TOKEN_KEY);
    dispatch(setLoginLogoutToState());
    navigate("/login");
  };
};
