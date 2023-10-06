import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button, Rating } from "@mui/material";
import ReviewList from "./ReviewList";
import RatingForm from "./RatingForm";

function BookDetails({ user }) {
  const { id } = useParams();
  // console.log(userReviews);
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState(null);
  const [avgRating, setAvgRating] = useState(null);

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
      <Grid container>
        <Grid item xs={8}>
          <h2>{book.title}</h2>
          <p>By {author}</p>
          <p>{book.desc}</p>
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
        <Grid item xs={4}>
          <img className="bookimg" src={book.cover_image} alt={book.title} />
        </Grid>
      </Grid>
      <Grid container>
        {user ? (
          <Grid item xs={12}>
            <RatingForm user={user} book={id} />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <h3>Reviews</h3>
        </Grid>
        <ReviewList setAvgRating={setAvgRating} user={user} />
      </Grid>
    </Container>
  );
}
export default BookDetails;
