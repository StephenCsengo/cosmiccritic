import React, { useEffect, useState } from "react";
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

function BookList({ books }) {
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
                  <Button variant="contained">View Details</Button>
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
