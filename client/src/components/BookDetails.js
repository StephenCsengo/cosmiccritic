import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button } from "@mui/material";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  useEffect(() => {
    fetch(`/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      });
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item xs={8}>
          <h2>{book.title}</h2>
          <p>{book.desc}</p>
        </Grid>
        <img src={book.cover_image} alt={book.title} />
      </Grid>
    </Container>
  );
}
export default BookDetails;
