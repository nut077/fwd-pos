import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import StockPage from "./components/pages/StockPage";
import { RootReducers } from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage";
import TransactionPage from "./components/pages/TransactionPage";
import ReportPage from "./components/pages/ReportPage";
import * as loginAction from "./actions/login.action";
import { Container } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = useState(false);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginAction.handleReLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function PrivateOutlet() {
    const auth = loginReducer.result;
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }

  function PrivateRoute({ children }: any) {
    const auth = loginReducer.result;
    console.log("auth", auth);
    return auth ? children : <Navigate to="/login" />;
  }

  function LoginRoute() {
    const auth = loginReducer.result;
    return auth ? <Navigate to="/stock" /> : <Outlet />;
  }

  const NotFound = () => {
    return <div>Not found</div>;
  };

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {loginReducer.result && (
          <>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <Menu open={open} handleDrawerClose={handleDrawerClose} />
          </>
        )}

        <Container>
          <DrawerHeader />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LoginRoute />}>
              <Route path="" element={<LoginPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stock" element={<PrivateOutlet />}>
              <Route path="" element={<StockPage />} />
              <Route path="create" element={<StockCreatePage />} />
              <Route path="edit/:id" element={<StockEditPage />} />
            </Route>
            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <ReportPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/transaction"
              element={
                <PrivateRoute>
                  <TransactionPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}
