import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUp({ updateUser }) {
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
      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status == 200) {
          const userData = res.json();
          updateUser(userData);
        }
      });
    },
  });
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <h2>Sign up</h2>
        </Grid>
        <Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                required
                id="username"
                label="Username"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.errors.username ? <p>{formik.errors.username}</p> : null}
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
              {formik.errors.password ? <p>{formik.errors.password}</p> : null}
              <input type="submit" />
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
