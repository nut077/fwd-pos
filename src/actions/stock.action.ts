import {
  server,
  STOCK_CLEAR,
  STOCK_FAILED,
  STOCK_FETCHING,
  STOCK_SUCCESS,
} from "../constants";
import Product from "../models/product.model";
//import Product from "../models/product.model";
import { httpClient } from "../utils/HttpClient";

export const setStateStockToSuccess = (payload: any) => ({
  type: STOCK_SUCCESS,
  payload,
});

const setStateStockToFetching = () => ({
  type: STOCK_FETCHING,
});

const setStateStockToFailed = () => ({
  type: STOCK_FAILED,
});

const setStateStockToClear = () => ({
  type: STOCK_CLEAR,
});

export const clearProduct = () => {
  return (dispatch: any) => {
    dispatch(setStateStockToClear());
  };
};

export const getProducts = () => {
  return async (dispatch: any) => {
    try {
      dispatch(setStateStockToFetching());
      const result = await doGetProducts();
      dispatch(setStateStockToSuccess(result));
    } catch (error) {
      dispatch(setStateStockToFailed());
    }
  };
};

export const addProduct = (formData: any, navigate: any) => {
  return async (dispatch: any) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    navigate(-1);
  };
};

export const updateProduct = (formData: any, navigate: any) => {
  return async (dispatch: any) => {
    await httpClient.put(server.PRODUCT_URL, formData);
    navigate(-1);
  };
};

export const getProductById = (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStateStockToFetching());
      let result = await httpClient.get(`${server.PRODUCT_URL}/id/${id}`);
      dispatch(setStateStockToSuccess(result.data));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStateStockToFailed());
    }
  };
};

export const deleteProduct = (id: any) => {
  return async (dispatch: any) => {
    dispatch(setStateStockToFetching());
    await httpClient.delete(`${server.PRODUCT_URL}/id/${id}`);
    const result = await doGetProducts();
    dispatch(setStateStockToSuccess(result));
  };
};

export const getProductByKeyword = (keyword: string) => {
  return async (dispatch: any) => {
    dispatch(setStateStockToFetching());

    if (keyword !== null && keyword !== "") {
      let result = await httpClient.get(
        `${server.PRODUCT_URL}/name/${keyword}`
      );
      dispatch(setStateStockToSuccess(result.data));
    } else {
      const result = await doGetProducts();
      dispatch(setStateStockToSuccess(result));
    }
  };
};

const doGetProducts = async () => {
  try {
    const result = await httpClient.get<Product[]>(server.PRODUCT_URL);
    return result.data;
  } catch (error) {
    return [];
  }
};