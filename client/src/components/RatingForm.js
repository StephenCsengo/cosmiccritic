import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Rating, TextField } from "@mui/material";

import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/";

function RatingForm({
  user,
  book,
  submitLocation = "/reviews",
  submitMethod = "POST",
  initialRating = 0,
  initialReview = "",
}) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      book_id: book,
      rating: initialRating,
      review: initialReview,
    },
    validationSchema: yup.object({
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
      fetch(submitLocation, {
        method: submitMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
          history.go(0);
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
            onBlur={formik.handleBlur}
            value={formik.values.rating}
          />

          {formik.touched.rating && formik.errors.rating ? (
            <p>{formik.errors.rating}</p>
          ) : null}
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.review}
          />
          <Button type="submit">Submit Review</Button>
        </form>
      </Grid>
    </Grid>
  );
}
export default RatingForm;
