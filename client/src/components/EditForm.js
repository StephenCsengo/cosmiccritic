import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Rating, TextField } from "@mui/material";

import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/";

function EditForm({ user, review }) {
  const history = useHistory();
  console.log("From edit form: ", user);
  console.log("From edit form: ", review);

  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      review_id: review.id,
      rating: review.rating,
      review: review.review,
    },
    validationSchema: yup.object({
      user_id: yup.number().required("UserID required.").integer(),
      review_id: yup.number().required("ReviewID required.").integer(),
      rating: yup
        .number()
        .min(0)
        .max(5)
        .required("Rating between 0 and 5 required.")
        .integer(),
      review: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      fetch(`/reviews/${review.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        response.json().then((result) => {
          history.push(`/bookdetails/${review.book.id}`);
        });
      });
    },
  });

  return (
    <Grid container>
      <Grid item>
        <h3>Update Your Review For {review.book.title}</h3>
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
export default EditForm;
