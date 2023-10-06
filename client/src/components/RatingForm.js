import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Rating, TextField } from "@mui/material";

import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/";

function RatingForm({ user, book }) {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      book_id: book,
      rating: 0,
      review: "",
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
      console.log(values);
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
          <button type="submit">Submit Review</button>
        </form>
      </Grid>
    </Grid>
  );
}
export default RatingForm;
