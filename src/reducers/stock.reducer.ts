import { STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS } from '../constants';

export interface StockState {
    result: any[];
    isFetching: boolean;
    isError: boolean
}

const initialState: StockState = {
    result: [],
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload }: any): StockState => {
    switch (type) {
        case STOCK_FETCHING:
            return { ...state, result: [], isFetching: true, isError: false }
        case STOCK_SUCCESS:
            return { ...state, result: payload, isFetching: false, isError: false }
        case STOCK_FAILED:
            return { ...state, result: [], isFetching: false, isError: true }
        default: return state;
    }
}