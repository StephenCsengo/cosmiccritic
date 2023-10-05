import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";

function SignUp({ updateUser }) {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <h2>Sign up</h2>
        </Grid>
        <Grid>
          <Grid item xs={12} md={6}>
            <form>
              <TextField
                required
                id="username"
                label="Username"
                variant="outlined"
                onChange={console.log}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={console.log}
              />
              <input type="submit" />
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
