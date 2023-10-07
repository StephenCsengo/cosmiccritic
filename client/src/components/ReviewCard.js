import React, { useEffect, useState } from "react";
import { Grid, Button, Rating, Card, CardContent } from "@mui/material";
import RatingForm from "./RatingForm";
import { Link } from "react-router-dom";

function ReviewCard({ review, user, setHasReviewed }) {
  let userId = null;
  const reviewUserId = review.user.id;

  function EditButton() {
    if (user) {
      userId = user.id;
      if (userId === reviewUserId) {
        setHasReviewed(true);
        return (
          <Link to={`/editreview/${review.id}`}>
            <Button variant="outlined" size="small">
              Edit Review
            </Button>
          </Link>
        );
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <p>
          <Rating value={review.rating} readOnly />
        </p>
        <p>By {review.user.username}</p>
        <p>{review.review}</p>
        {user ? (
          <>
            <p>{EditButton()}</p>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
