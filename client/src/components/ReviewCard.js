import React, { useEffect, useState } from "react";
import { Grid, Button, Rating, Card, CardContent } from "@mui/material";

function ReviewCard({ review, user, setHasReviewed }) {
  let userId = null;
  const reviewUserId = review.user.id;
  const matchId = false;
  console.log("From reviewcard of variable userId: ", userId);
  console.log("FRom reviewcard of variable reviewUserId: ", reviewUserId);

  function EditButton() {
    if (user) {
      userId = user.id;
      if (userId === reviewUserId) {
        setHasReviewed(true);
        return (
          <Button variant="outlined" size="small">
            Edit Review
          </Button>
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
        <p>{EditButton()}</p>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
