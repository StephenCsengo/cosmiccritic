import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import Fuse from "fuse.js";

function BookList({ books, onBookClick }) {
  const [query, setQuery] = useState("");
  const fuse = new Fuse(books, {
    keys: ["title", "author.name", "publish_year"],
  });

  const results = fuse.search(query);

  const bookList = query ? results.map((book) => book.item) : books;

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }
  return (
    <Container>
      <Grid container>
        <Grid item>
          <TextField
            id="search"
            label="search"
            variant="outlined"
            autoComplete="off"
            value={query}
            onChange={handleOnSearch}
          />
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Pages</TableCell>
              <TableCell align="center">Year Published</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((book) => (
              <TableRow key={book.title}>
                <TableCell component="th" scope="row">
                  {book.title}
                </TableCell>
                <TableCell align="center">{book.author.name}</TableCell>
                <TableCell align="center">{book.page_count}</TableCell>
                <TableCell align="center">{book.publish_year}</TableCell>
                <TableCell align="center">
                  <Link to={`/bookdetails/${book.id}`}>
                    <Button
                      variant="contained"
                      onClick={() => onBookClick(book)}
                    >
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default BookList;
