import {FC, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as stockAction from '../../../actions/stock.action'
import { Box } from "@mui/system";

type StockPageProps = {
  //
};

const StockPage: FC<any> = () => {
  const dispatch = useDispatch();
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer)

  useEffect(() => {
    dispatch(stockAction.getProducts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showContent = () => {
    return <ul>
     {stockReducer.result.map((item: any, index: number) => (
       <ul key={index}>{JSON.stringify(item.name)}</ul>
     ))}
    </ul>
  }

  const showLoading = () => {
    console.log('show loading')
    return <h2>Loading...</h2>
  }

  return <Box sx={{background: 'red', height: 100}}>
    <h1>StockPage</h1>
    {stockReducer.isFetching ? showLoading(): showContent()}
  </Box>;
};

export default StockPage;
