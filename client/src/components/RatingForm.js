import React from "react";
import { Button, Grid, TextField } from "@mui/material";

import { useFormik } from "formik";
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
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                type="number"
                id="rating"
                label="Rating"
                autoComplete="off"
                min={0}
                max={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
              />

              {formik.touched.rating && formik.errors.rating ? (
                <p className="error">{formik.errors.rating}</p>
              ) : null}
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="review"
                label="Review"
                rows={4}
                multiline
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.review}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button variant="outlined" type="submit">
                Submit Review
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
export default RatingForm;
