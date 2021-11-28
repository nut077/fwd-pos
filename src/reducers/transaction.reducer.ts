import {
    TRANSACTION_FAILED,
    TRANSACTION_FETCHING,
    TRANSACTION_SUCCESS,
} from "../constants";
import { TransactionResponse } from "../models/transaction";

export interface TransactionState {
    result: TransactionResponse[];
    isFetching: boolean;
    isError: boolean;
}

const initialState: TransactionState = {
    result: [],
    isFetching: false,
    isError: false,
};

const transactionReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case TRANSACTION_SUCCESS:
            return { ...state, result: payload, isFetching: false, isError: false };
        case TRANSACTION_FAILED:
            return { ...state, result: [], isFetching: false, isError: true };
        case TRANSACTION_FETCHING:
            return { ...state, result: [], isFetching: true, isError: false };
        default:
            return state;
    }
}

export default transactionReducer