import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik, FormikProps, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as stockActions from "./../../../actions/stock.action";

const StockCreatePage = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showForm = ({ values, setFieldValue }: FormikProps<FormikValues>) => {
    return (
      <Form style={{ marginTop: 30 }}>
        <Card elevation={5} sx={{ padding: 2 }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Create Stock
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="stock"
              type="number"
              label="Stock"
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
                alt="Product"
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                Add Picture
              </span>

              <input
                type="file"
                onChange={(e: any) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Create
            </Button>
            <Button component={Link} to="/stock" variant="outlined" fullWidth>
              Cancl
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 300 }} />;
    }
  };

  return (
    <Box>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "Enter name";
          if (values.stock < 10) errors.stock = "Minimux stock is 10";
          if (values.price < 100) errors.price = "Minimux price is 100";
          return errors;
        }}
        initialValues={{ name: "", stock: 10, price: 90 }}
        onSubmit={(values: any, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("price", values.price);
          formData.append("stock", values.stock);
          formData.append("image", values.file);
          dispatch(stockActions.addProduct(formData, navigate));
          setSubmitting(false);
        }}
      >
        {(props: FormikProps<FormikValues>) => showForm(props)}
      </Formik>
    </Box>
  );
};

export default StockCreatePage;
