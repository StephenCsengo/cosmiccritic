import React, { useEffect, useState } from "react";
import { Grid, Button, Rating, Card, CardContent, Modal } from "@mui/material";
import EditReview from "./EditReview";

function EditButton({ user, reviewUserId, setHasReviewed, handleSetOpen }) {
  let userId = null;
  if (user) {
    userId = user.id;
    if (userId === reviewUserId) {
      setHasReviewed(true);
      return (
        <Grid item>
          <Button variant="outlined" size="small" onClick={handleSetOpen}>
            Edit Review
          </Button>
        </Grid>
      );
    }
  }
}

export default EditButton;
