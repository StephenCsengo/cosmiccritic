import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Button,
  Rating,
  Card,
  CardContent,
} from "@mui/material";

function UserProfile({ user }) {
  const [userReviews, setUserReviews] = useState([]);
  const [errors, setErrors] = useState([]);
  const [totalReviews, setTotalReviews] = useState(null);
  const [avgReviews, setAvgReviews] = useState(null);

  useEffect(() => {
    fetch(`/users/${user.id}/reviews`).then((response) => {
      if (response.ok) {
        response.json().then((data) => setUserReviews(data));
      } else {
        response.json().then((errors) => setErrors(errors));
      }
    });
  }, []);
  console.log("From userprofile: ", user);

  console.log("From userprofile: ", userReviews);

  return (
    <>
      {user ? (
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <h1>{user.username}'s Profile</h1>
              <h2>Your Reviews</h2>
            </Grid>
            <Grid container spacing={2}>
              {userReviews.length > 0 ? (
                userReviews.map((review) => (
                  <Grid item xs={12} md={4} key={review.book.title}>
                    <Card>
                      <CardContent>
                        <h3>{review.book.title}</h3>
                        <p>{review.book.author.name}</p>
                        <Rating value={review.rating} readOnly />
                        <p>{review.review}</p>
                        <Button>Edit review</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <p>No reviews to show</p>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      ) : (
        <p>No reviews to show</p>
      )}
      ;
    </>
  );
}

export default UserProfile;
