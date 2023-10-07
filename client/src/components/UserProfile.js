import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}/reviews`).then((response) => {
        if (response.ok) {
          response.json().then((data) => setUserReviews(data));
        } else {
          response.json().then((errors) => setErrors(errors));
        }
      });
    }
  }, [user]);
  console.log("From userprofile user: ", user);

  console.log("From userprofile: ", userReviews);
  let ratingTotal = userReviews.reduce((acc, obj) => {
    return acc + obj.rating;
  }, 0);
  let avgre = ratingTotal / userReviews.length;

  return (
    <>
      {user ? (
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <h1>{user.username}'s Profile</h1>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={6}>
                      <p>Average rating:</p>
                      <Rating value={avgre} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={6}>
                      <p>Number of reviews</p>
                      <p>{userReviews.length}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

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
                        <Grid container>
                          <Grid item xs={6}>
                            <Link to={`/editreview/${review.id}`}>
                              <Button>Edit review</Button>
                            </Link>
                          </Grid>
                          <Grid item xs={6}>
                            <DeleteButton reviewId={review.id} />
                          </Grid>
                        </Grid>
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
