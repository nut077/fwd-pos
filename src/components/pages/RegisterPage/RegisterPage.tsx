import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, SxProps } from "@mui/system";
import { Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { FormikValues } from "formik/dist/types";
import * as registerActions from "../../../actions/register.acion";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { RootReducers } from "../../../reducers";

const classes: SxProps = {
  root: { display: "flex", justifyContent: "center", alignItems: "center" },
  submitBtn: { marginTop: 4 },
  canelBtn: { marginTop: 2 },
};

const RegisterPage = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }: any) => {
    return (
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={handleChange}
          value={values.password}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          sx={classes.submitBtn}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={registerReducer.isFetching}
        >
          Create
        </Button>
        <Button
          sx={classes.canelBtn}
          onClick={() => navigate("/login")}
          type="button"
          fullWidth
          variant="outlined"
        >
          Cancel
        </Button>
        {registerReducer.isError && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            Error, register
          </Alert>
        )}
      </form>
    );
  };

  const showMyForm = ({
    handleChange,
    values,
    handleSubmit,
    isSubmitting,
  }: FormikProps<FormikValues>) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
        />

        <button disabled={isSubmitting}>Submit</button>
      </form>
    );
  };

  return (
    <Box sx={classes.root}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Register
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, {}) => {
              dispatch(registerActions.handleRegister(values));
            }}
          >
            {(props: FormikProps<FormikValues>) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
