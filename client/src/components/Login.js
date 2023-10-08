import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { ImageList, ImageListItem } from "@mui/material";
import { useHistory } from "react-router-dom/";

function Login({ updateUser, books }) {
  const [error, setError] = useState(null);
  const history = useHistory();
  let imageList = books.slice(0, 6);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username required"),
      password: yup
        .string()
        .min(10, "Password must be at least 10 characters")
        .required("Password required"),
    }),
    onSubmit: (values) => {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.status == 200) {
          response.json().then((result) => {
            updateUser(result);
            console.log("From login: ", result);
            history.push("/");
          });
        } else if (response.status == 401) {
          setError("Unauthorized, check your username and password");
        }
      });
    },
  });
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6}>
          <h2>Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="username"
                  label="Username"
                  variant="outlined"
                  error={error ? true : false}
                  helperText={error}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.errors.username ? (
                  <p className="error">{formik.errors.username}</p>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageList sx={{ width: 500, height: 520 }} cols={3} rowHeight={250}>
            {imageList.map((item) => (
              <ImageListItem key={item.cover_image}>
                <img
                  srcSet={`${item.cover_image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.cover_image}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
