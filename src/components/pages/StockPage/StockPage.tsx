import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootReducers } from "../../../reducers";
import * as stockActions from "./../../../actions/stock.action";
import { imageUrl } from "./../../../constants";
import StockCard from "./../../fragments/StockCard/StockCard";
import { useDebounce, useDebounceCallback } from "@react-hook/debounce";
import { useNavigate } from "react-router-dom";
import Product from "../../../models/product.model";
//import Product from "./../../../models/product.model";

const StockPage = () => {
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openMyDialog, setOpenMyDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [value, setValue] = useDebounce("", 500);
  const theme = useTheme();

  // Watch value when changed
  useEffect(() => {
    dispatch(stockActions.getProductByKeyword(value));
  }, [value]);

  // Listen component created
  useEffect(() => {
    dispatch(stockActions.getProducts());
  }, []);

  const actions = [
    {
      icon: "edit",
      iconProps: { color: "primary" },
      tooltip: "Edit",
      onClick: (event: any, rowData: any) =>
        navigate("/stock/edit/" + rowData.product_id),
    },
    {
      icon: "delete",
      iconProps: { color: "action" },
      tooltip: "Delete",
      onClick: (event: any, rowData: any) => {
        setSelectedProduct(rowData);
        setOpenDialog(true);
      },
    },
  ];

  const handleDeleteConfirm = () => {
    dispatch(stockActions.deleteProduct(selectedProduct.product_id));
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/images/${
              selectedProduct.image
            }?dummy=${Math.random()}`}
            style={{ width: 300, borderRadius: "5%" }}
            alt="Product"
          />
          <br />
          Confirm to delete the product? : {" " + selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showMyDialog = () => (
    <Dialog
      open={openMyDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenMyDialog(false)}>Disagree</Button>
        <Button onClick={() => setOpenMyDialog(false)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      {/* Summary Icons */}
      <Grid container style={{ marginBottom: theme.spacing(1) }} spacing={7}>
        <Grid item lg={3} md={6}>
          <StockCard
            icon={() => (
              <Avatar
                src="https://undubzapp.com/wp-content/uploads/2020/06/7-33.jpg"
                style={{ width: 50, borderRadius: "5%" }}
              />
            )}
            title="TOTAL"
            subtitle="112 THB"
            color="#00a65a"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={NewReleasesIcon}
            title="EMPTY"
            subtitle="9 PCS."
            color="#f39c12"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={AssignmentReturnIcon}
            title="RETURN"
            subtitle="1 PCS."
            color="#dd4b39"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={StarIcon}
            title="LOSS"
            subtitle="5 PCS."
            color="#00c0ef"
          />
        </Grid>
      </Grid>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          marginTop: theme.spacing(11),
          display: "flex",
          alignItems: "center",
          width: 400,
          marginBottom: 2,
        }}
      >
        <input type="text" hidden />
        <InputBase
          onChange={(e) => {
            setValue(e.target.value);
            //dispatch(stockActions.getProductByKeyword(e.target.value));
            e.stopPropagation();
            e.preventDefault();
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search product name"
          inputProps={{ "aria-label": "search product name" }}
        />
        <SearchIcon />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="add"
          component={Link}
          to="/stock/create"
        >
          <AddIcon />
        </IconButton>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockReducer.result.map((item: Product) => (
              <TableRow hover key={item.product_id} sx={{ padding: 0 }}>
                {/* Id */}
                <TableCell component="th" scope="row">
                  <Typography variant="body1">{item.product_id}</Typography>
                </TableCell>

                {/* Image */}
                <TableCell align="left">
                  <Avatar
                    sx={{ backgroundColor: "gray" }}
                    onClick={() => {
                      // alert(item.name);
                      setOpenMyDialog(true);
                    }}
                    src={`${imageUrl}/images/${
                      item.image
                    }?dummy=${Math.random()}`}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">{item.name}</Typography>
                </TableCell>
                {/* Price */}
                <TableCell align="right">
                  <Typography variant="body1">
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"???"}
                    />
                  </Typography>
                </TableCell>
                {/* Stock */}
                <TableCell align="right">
                  <Typography variant="body1">
                    <NumberFormat
                      value={item.stock}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={0}
                      fixedDecimalScale={true}
                    />
                  </Typography>
                </TableCell>
                {/* Create */}
                <TableCell align="right">
                  <Typography>
                    <Moment format="DD/MM/YYYY">{item.created}</Moment>
                  </Typography>
                </TableCell>

                {/* Actions */}
                <TableCell align="left">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton
                      aria-label="edit"
                      size="large"
                      onClick={() => {
                        navigate("/stock/edit/" + item.product_id);
                      }}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => {
                        setSelectedProduct(item);
                        setOpenDialog(true);
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showDialog()}
      {showMyDialog()}
    </Box>
  );
};

export default StockPage;
