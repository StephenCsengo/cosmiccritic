import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useHistory } from "react-router-dom/";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUp({ books, updateUser }) {
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
        .required("Password of at least 10 characters required"),
    }),
    onSubmit: (values) => {
      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status == 201) {
          const userData = res.json();

          updateUser(userData);
        } else if (res.status == 401) {
          setError("Username taken.");
        }
      });
    },
  });
  console.log(error);
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6}>
          <h2>Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
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
            <input type="submit" />
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

export default SignUp;
