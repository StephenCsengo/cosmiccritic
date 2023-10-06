import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Rating, TextField } from "@mui/material";

import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/";

function RatingForm({ user, book, rating = 0, review = "" }) {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      book_id: book,
      rating: rating,
      review: review,
    },
    validateSchema: yup.object({
      user_id: yup.number().required("UserID required.").integer(),
      book_id: yup.number().required("BookID required.").integer(),
      rating: yup
        .number()
        .min(0)
        .max(5)
        .required("Rating between 0 and 5 required.")
        .integer(),
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
          history.push(0);
        });
      });
    },
  });

  return (
    <Grid container>
      <Grid item>
        <h3>Add Your Review</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            autoComplete="off"
            min={0}
            max={5}
            onChange={formik.handleChange}
            value={formik.values.rating}
          />

          {formik.touched.rating && formik.errors.rating ? (
            <p>{formik.errors.rating}</p>
          ) : null}
          <TextField
            id="review"
            label="Review"
            variant="outlined"
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.review}
          />
          <input type="submit" />
        </form>
      </Grid>
    </Grid>
  );
}
export default RatingForm;
