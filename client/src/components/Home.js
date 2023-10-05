import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Container,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";

function Home({ books }) {
  let imageList = books.slice(4, 10);
  return (
    <Container>
      <Grid container>
        <Grid item xs={8} md={6}>
          <h2>Don't Get Lost In Space</h2>
          <p>
            Keep track of your thoughts on science fiction novels and discover
            your next great adventure.
          </p>
          <Link to="/signup" exact>
            <Button variant="contained">Sign Up</Button>
          </Link>
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
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
