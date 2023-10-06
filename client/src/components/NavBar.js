import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AppBar, Container, Grid, Menu, Toolbar, Button } from "@mui/material";

function NavBar({ user, updateUser }) {
  const history = useHistory();
  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((response) => {
      updateUser(null);
    });
    history.push("/loginform");
  };
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <h1>CosmicCritic</h1>
            <NavLink to="/" exact>
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink to="/booklist">
              <Button color="inherit">Browse Books</Button>
            </NavLink>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <NavLink to="/signup" exact>
              <Button color="inherit">Sign Up</Button>
            </NavLink>
            <NavLink to="/loginform">
              <Button color="inherit">Login</Button>
            </NavLink>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
