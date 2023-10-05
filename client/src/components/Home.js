import React from "react";
import { Grid, Container, Button } from "@mui/material";

function Home() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={8} md={6}>
          <h2>Don't Get Lost In Space</h2>
          <p>
            Keep track of your thoughts on science fiction novels and discover
            your next great adventure.
          </p>
          <Button color="inherit">Sign Up</Button>
          <p>
            Already have an account?<a href="/">Login</a>
          </p>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
