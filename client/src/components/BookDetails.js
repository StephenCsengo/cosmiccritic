import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button } from "@mui/material";
import ReviewList from "./ReviewList";

function BookDetails() {
  const { id } = useParams();
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
          <p>{avgRating}</p>
          <h3>Details</h3>
          <p>{book.page_count} pages</p>
          <p>Published in {book.publish_year}</p>
        </Grid>
        <Grid item xs={4}>
          <img src={book.cover_image} alt={book.title} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h3>Reviews</h3>
        </Grid>
        <ReviewList setAvgRating={setAvgRating} />
      </Grid>
    </Container>
  );
}
export default BookDetails;
