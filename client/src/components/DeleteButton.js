import React from "react";
import { Button, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useHistory } from "react-router-dom/";

function DeleteButton({ reviewId }) {
  const history = useHistory();
  const handleDelete = () => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => history.go(0));
  };
  return (
    <Tooltip title="Delete Review">
      <Button color="error" onClick={handleDelete}>
        <DeleteForeverIcon />
      </Button>
    </Tooltip>
  );
}

export default DeleteButton;
