import {
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  server
} from "../constants";
import { httpClient } from "../utils/HttpClient";

export const setRegisterFetchingToState = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterSuccessToState = (payload: any) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setRegisterFailedToState = () => ({
  type: REGISTER_FAILED,
});

export const handleRegister = (account: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setRegisterFetchingToState());
      const data = await doHandleRegister(account);
      if (data.result === "ok") {
        dispatch(setRegisterSuccessToState(data));
      } else {
        dispatch(setRegisterFailedToState());
      }
    } catch (err) {
      dispatch(setRegisterFailedToState());
    }
  };
};

const doHandleRegister = async (account: any) => {
  /* const result = await axios.post(
    "http://localhost:8082/api/v2/register",
    account
  ); */
  const result = await httpClient.post(server.REGISTER_URL, account)
  return result.data;
};
