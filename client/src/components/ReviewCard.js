import React, { useEffect, useState } from "react";
import { Grid, Button, Rating, Card, CardContent, Modal } from "@mui/material";
import RatingForm from "./RatingForm";
import { Link } from "react-router-dom";
import EditButton from "./EditButton";

function ReviewCard({ review, user, setHasReviewed }) {
  const reviewUserId = review.user.id;

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
            <div>
              <RatingForm
                user={user}
                book={review.book}
                submitLocation={`/reviews/${review.id}`}
                submitMethod="PATCH"
                initialRating={review.rating}
                initialReview={review.review}
              />
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
