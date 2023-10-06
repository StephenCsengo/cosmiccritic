import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button, Rating } from "@mui/material";
import ReviewCard from "./ReviewCard.js";

function ReviewList({ user, setAvgRating }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/books/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  //Send average rating back to BookDetails
  useEffect(() => {
    const ratings = reviews.map((review) => review.rating);
    const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    setAvgRating(avgRating);
  }, [reviews, setAvgRating]);

  return reviews.map((review) => (
    <Grid item xs={12} md={4} key={review.id}>
      <ReviewCard review={review} user={user} />
    </Grid>
  ));
}

export default ReviewList;
