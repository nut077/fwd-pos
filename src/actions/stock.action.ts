import {
  STOCK_CLEAR,
  STOCK_FAILED,
  STOCK_FETCHING,
  STOCK_SUCCESS,
  server
} from "../constants";
import { httpClient } from "../utils/HttpClient";

const setStockSuccessToState = (payload: any) => ({
  type: STOCK_SUCCESS,
  payload
})

const setStockFetchingToState = () => ({
  type: STOCK_FETCHING
})

const setStockFailedToState = () => ({
  type: STOCK_FAILED
})

const setStockClearToState = () => ({
  type: STOCK_CLEAR
})

const doGetProducts = async () => {
  try {
    const result = await httpClient.get(server.PRODUCT_URL);
    return result.data.result;
  } catch (err) {
    return [];
  }
}

export const getProducts = () => {
  return async (dispatch: any) => {
    try {
      dispatch(setStockFetchingToState());
      const result = await doGetProducts();
      dispatch(setStockSuccessToState(result));
    } catch (err) {
      dispatch(setStockFailedToState());
    }
  }
}
