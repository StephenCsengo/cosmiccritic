import React from "react";
import { Button, Grid, TextField } from "@mui/material";

import { useFormik } from "formik";
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
    <Grid container spacing={2}>
      <Grid item>
        <h3>Update Your Review For {review.book.title}</h3>
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
export default EditForm;
