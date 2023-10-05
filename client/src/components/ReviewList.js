import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button } from "@mui/material";

function ReviewList() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/books/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  console.log(reviews);
  return reviews.map((review) => (
    <Grid item xs={12} md={4} key={review.id}>
      <p>{review.review}</p>
      <p>Rating: {review.rating}</p>
    </Grid>
  ));
}

export default ReviewList;
