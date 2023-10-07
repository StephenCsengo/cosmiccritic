import React from "react";
import { Button } from "@mui/material";

function DeleteButton({ reviewId }) {
  const handleDelete = () => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <Button color="error" onClick={handleDelete}>
      X
    </Button>
  );
}

export default DeleteButton;
