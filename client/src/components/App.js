import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import Home from "./Home.js";
import BookList from "./BookList.js";
import BookDetails from "./BookDetails.js";
import SignUp from "./SignUp.js";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  //Fetch list of books
  useEffect(() => {
    fetch("/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  function handleBookClick(book) {
    console.log(`${book.id} was clicked`);
  }

  const handleUpdateUser = (user) => {
    setUser(user);
    console.log(user);
  };
  return (
    <div className="app">
      <NavBar />

      <Switch>
        <Route path="/booklist">
          <BookList books={books} onBookClick={handleBookClick} />
        </Route>
        <Route exact path="/">
          <Home books={books} />
        </Route>
        <Route exact path="/bookdetails/:id">
          <BookDetails />
        </Route>
        <Route exact path="/signup">
          <SignUp updateUser={handleUpdateUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
