import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Rating, TextField } from "@mui/material";
import EditForm from "./EditForm";
import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom/";

function EditReview({ user }) {
  const { id } = useParams();
  const history = useHistory();
  const [review, setReview] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userMatch, setUserMatch] = useState(false);
  useEffect(() => {
    fetch(`/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReview(data);
        setLoaded(true);
        if (user && review) {
          if (user.id === data.user.id) {
            setUserMatch(true);
          }
        }
      });
  }, [id, user]);

  console.log(userMatch);
  return (
    <Container>
      <Grid container>
        <Grid xs={12}>
          <h2>Edit Review</h2>
        </Grid>
        {user ? (
          <Grid item xs={12}>
            {userMatch ? (
              <Grid container>
                {loaded ? (
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <EditForm user={user} review={review} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <h3>Previous Review</h3>
                      <Grid container>
                        <Grid item xs={8}>
                          <Rating
                            name="rating"
                            value={review.rating}
                            readOnly
                          />
                          <p>{review.review}</p>
                        </Grid>
                        <Grid item xs={4}>
                          <img
                            className="bookimgedit"
                            src={review.book.cover_image}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <p>Loading...</p>
                )}
              </Grid>
            ) : (
              <h3 style={{ color: "FireBrick" }}>
                Cannot edit another user's review
              </h3>
            )}
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}
export default EditReview;
