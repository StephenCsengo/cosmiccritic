import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Rating, TextField } from "@mui/material";
import EditForm from "./EditForm";
import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom/";

function EditReview({ user }) {
  const { id } = useParams();
  const history = useHistory();
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch(`/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReview(data);
      });
  }, []);
  return (
    <Container>
      <Grid container>
        <h2>Edit Review</h2>
        {user ? <EditForm user={user} review={review} /> : null}
      </Grid>
    </Container>
  );
}
export default EditReview;
