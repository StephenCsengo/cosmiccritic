import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Container,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";

function Home({ books, user }) {
  let imageList = books.slice(4, 10);
  console.log("From home:", user);
  return (
    <Container>
      <Grid container>
        <Grid item xs={8} md={6}>
          <h2>Don't Get Lost In Space</h2>
          {user ? <h2>Welcome {user.username}</h2> : null}
          <p>
            Keep track of your thoughts on science fiction novels and discover
            your next great adventure.
          </p>
          {user ? (
            <Link to="/booklist">
              <Button variant="contained">Browse Books</Button>
            </Link>
          ) : (
            <div>
              <Link to="/signup">
                <Button variant="contained">Sign Up</Button>
              </Link>
              <p>
                Already have an account? <a href="/">Login</a>
              </p>
            </div>
          )}
        </Grid>
        <Grid item xs={4} md={6}>
          <ImageList sx={{ width: 500, height: 520 }} cols={3} rowHeight={250}>
            {imageList.map((item) => (
              <ImageListItem key={item.cover_image}>
                <img
                  srcSet={`${item.cover_image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.cover_image}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
