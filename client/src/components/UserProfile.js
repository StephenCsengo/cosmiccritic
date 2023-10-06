import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Button,
  TableContainer,
  TableRow,
  TableCell,
} from "@mui/material";

function UserProfile({ user }) {
  console.log("From userprofile: ", user);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user !== null) {
      fetch(`/users/${user.id}/reviews`)
        .then((response) => response.json())
        .then((data) => {
          setReviews(data);
        });
    }
  }, []);
  console.log(reviews);

  return (
    <>
      {user ? (
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <h1>{user.username}'s Profile</h1>
              <h2>Your Reviews</h2>
            </Grid>
            <Grid item>
              {reviews ? (
                <p>You have some reviews</p>
              ) : (
                <p>No reviews to show</p>
              )}
            </Grid>
          </Grid>
        </Container>
      ) : null}
      ;
    </>
  );
}

export default UserProfile;
