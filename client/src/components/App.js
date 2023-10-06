import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import Home from "./Home.js";
import BookList from "./BookList.js";
import BookDetails from "./BookDetails.js";
import SignUp from "./SignUp.js";
import Login from "./Login.js";

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
    console.log("From app: ", user);
  };
  return (
    <div className="app">
      <NavBar user={user} updateUser={handleUpdateUser} />

      <Switch>
        <Route path="/booklist">
          <BookList books={books} onBookClick={handleBookClick} />
        </Route>
        <Route exact path="/">
          <Home books={books} user={user} />
        </Route>
        <Route exact path="/bookdetails/:id">
          <BookDetails />
        </Route>
        <Route exact path="/signup">
          <SignUp updateUser={handleUpdateUser} />
        </Route>
        <Route exact path="/loginform">
          <Login updateUser={handleUpdateUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
