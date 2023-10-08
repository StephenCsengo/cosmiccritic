import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button, Rating } from "@mui/material";
import ReviewList from "./ReviewList";
import RatingForm from "./RatingForm";

function BookDetails({ user }) {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    fetch(`/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setAuthor(data.author.name);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2>{book.title}</h2>
          <p>By {author}</p>
          <p>{book.desc}</p>
          <Grid container>
            <Grid item xs={12} md={6}>
              <h3>Average Rating</h3>
              <Rating
                name="average-rating"
                value={avgRating}
                precision={0.5}
                readOnly
              />
              <h3>Details</h3>
              <p>{book.page_count} pages</p>
              <p>Published in {book.publish_year}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              {user ? (
                <Grid item xs={12}>
                  {hasReviewed ? null : <RatingForm user={user} book={id} />}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <img className="bookimg" src={book.cover_image} alt={book.title} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Reviews</h3>
        </Grid>
        <ReviewList
          setAvgRating={setAvgRating}
          user={user}
          setHasReviewed={setHasReviewed}
        />
      </Grid>
    </Container>
  );
}
export default BookDetails;
