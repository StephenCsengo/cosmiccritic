import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button } from "@mui/material";

function UserProfile({ user }) {
  console.log(user);
  return <h1>User Profile</h1>;
}

export default UserProfile;
