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
            Welcome to our hub for all things science fiction. Get ready to dive
            into mind-bending stories that will take you on thrilling adventures
            through the cosmos. Share your thoughts and connect with fellow
            science fiction fans who are just as passionate about these
            interstellar journeys as you are. Together, we'll explore galaxies,
            encounter aliens, and unravel the mysteries of the universe.
          </p>
          {user ? (
            <Link to="/booklist">
              <Button variant="contained">Browse Books</Button>
            </Link>
          ) : (
            <div>
              <p>
                Join us now and let's embark on this cosmic adventure together!
              </p>
              <Link to="/signup">
                <Button variant="contained">Sign Up</Button>
              </Link>
              <p>
                Already have an account?{" "}
                <Link to="/loginform">
                  <Button>Login</Button>
                </Link>
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
