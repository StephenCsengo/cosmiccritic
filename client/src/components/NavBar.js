import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AppBar, Container, Grid, Menu, Toolbar, Button } from "@mui/material";

function NavBar({ user, updateUser }) {
  console.log("From navbar:", user);
  const history = useHistory();
  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((response) => {
      updateUser(null);
    });
    history.push("/loginform");
  };

  const loggedin = (
    <Grid>
      <Button color="inherit">My Profile</Button>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Grid>
  );

  const loggedout = (
    <Grid>
      <NavLink to="/signup" exact>
        <Button color="inherit">Sign Up</Button>
      </NavLink>
      <NavLink to="/loginform">
        <Button color="inherit">Login</Button>
      </NavLink>
    </Grid>
  );
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
            {user ? loggedin : loggedout}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
