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
} from "@mui/material";

function BookList({ books, onBookClick }) {
  return (
    <Container>
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
            {books.map((book) => (
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
