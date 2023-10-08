import React from "react";
import { Grid, Button, Rating, Card, CardContent, Box } from "@mui/material";

import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

function ReviewCard({ review, user, setHasReviewed, hasReviewed }) {
  let userId = null;
  const reviewUserId = review.user.id;

  function EditButton() {
    if (user) {
      userId = user.id;
      if (userId === reviewUserId) {
        setHasReviewed(true);
        return (
          <Grid container>
            <Grid item xs={6}>
              <Link to={`/editreview/${review.id}`}>
                <Button variant="outlined" size="small">
                  Edit Review
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6} justify="flex-end">
              <Box display="flex" justifyContent="flex-end">
                <DeleteButton reviewId={review.id} />
              </Box>
            </Grid>
          </Grid>
        );
      }
    }
  }

  return (
    <Card>
      <CardContent className="card">
        <p>
          <Rating value={review.rating} readOnly />
        </p>
        <p>By {review.user.username}</p>
        <p>{review.review}</p>
        {user && !hasReviewed ? <p>{EditButton()}</p> : null}
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
