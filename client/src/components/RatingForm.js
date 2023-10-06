import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Rating, TextField } from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/";
import { bool } from "prop-types";

function RatingForm({ user, book }) {
  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      book_id: book,
      rating: "",
      review: "",
    },
    validateSchema: yup.object({
      user_id: yup.number().required("UserID required.").integer(),
      book_id: yup.number().required("BookID required.").integer(),
      rating: yup.number().required("Rating required.").integer(),
      review: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
        });
      });
    },
  });

  return (
    <Container>
      <Grid container>
        <Grid item>
          <h3>Add Your Review</h3>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              required
              id="rating"
              label="Rating"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rating}
            />
            {formik.touched.rating && formik.errors.rating ? (
              <p>{formik.errors.rating}</p>
            ) : null}
            <TextField
              id="review"
              label="Review"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.review}
            />
            <input type="submit" />
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
export default RatingForm;
