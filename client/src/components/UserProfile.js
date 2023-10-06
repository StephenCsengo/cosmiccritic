import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Button,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";

function UserProfile({ user }) {
  const [userReviews, setUserReviews] = useState([]);
  const [errors, setErrors] = useState([]);

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
            <Grid item>
              {userReviews ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Review</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userReviews.map((review) => (
                        <TableRow key={review.book.title}>
                          <TableCell>{review.book.title}</TableCell>
                          <TableCell>{review.book.author.name}</TableCell>
                          <TableCell>{review.rating}</TableCell>
                          <TableCell>{review.review}</TableCell>
                          <TableCell>
                            <Button>Edit review</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p>No reviews to show</p>
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
