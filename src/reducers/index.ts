import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import loginReducer, { LoginState } from "./login.reducer";
import stockReducer, { StockState } from "./stock.reducer";
import stockEditReducer, { StockEditState } from "./stock.edit.reducer";
import shopReducer, { ShopState } from "./shop.reducer";
import transactionReducer, { TransactionState } from "./transaction.reducer";

export default combineReducers({ registerReducer, loginReducer, stockReducer, stockEditReducer, shopReducer, transactionReducer });

export interface RootReducers {
  registerReducer: RegisterState;
  loginReducer: LoginState;
  stockReducer: StockState;
  stockEditReducer: StockEditState;
  shopReducer: ShopState;
  transactionReducer: TransactionState
}
