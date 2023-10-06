import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button, Rating } from "@mui/material";
import ReviewCard from "./ReviewCard.js";

function ReviewList({ user, setAvgRating, setHasReviewed }) {
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
    if (Array.isArray(reviews) && reviews.length !== 0) {
      const ratings = reviews.map((review) => review.rating);
      const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      setAvgRating(avgRating);
    }
  }, [reviews, setAvgRating]);

  if (Array.isArray(reviews) && reviews.length !== 0) {
    return reviews.map((review) => (
      <Grid item xs={12} md={4} key={review.id}>
        <ReviewCard
          review={review}
          user={user}
          setHasReviewed={setHasReviewed}
        />
      </Grid>
    ));
  } else {
    return <p>No reviews yet!</p>;
  }
}

export default ReviewList;
