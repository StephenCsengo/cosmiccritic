import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Container, Grid, Menu, Toolbar, Button } from "@mui/material";

function NavBar() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <h1>CosmicCritic</h1>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Browse Books</Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button color="inherit">Sign Up</Button>
            <Button color="inherit">Login</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default NavBar;
