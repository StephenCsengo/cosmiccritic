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
  const ratings = reviews.map((review) => review.rating);
  const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  console.log(avgRating);

  return reviews.map((review) => (
    <Grid item xs={12} md={4} key={review.id}>
      <p>Rating: {review.rating}</p>
      <p>By {review.user.username}</p>
      <p>{review.review}</p>
    </Grid>
  ));
}

export default ReviewList;
