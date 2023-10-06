import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import Home from "./Home.js";
import BookList from "./BookList.js";
import BookDetails from "./BookDetails.js";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import UserProfile from "./UserProfile.js";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState([]);

  const fetchUser = () => {
    fetch("/checksession").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      } else {
        response.json().then((errors) => setErrors(errors));
      }
    });
  };

  //Fetch list of books
  useEffect(() => {
    fetchUser();
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
          <BookDetails user={user} />
        </Route>
        <Route exact path="/signup">
          <SignUp updateUser={handleUpdateUser} />
        </Route>
        <Route exact path="/loginform">
          <Login updateUser={handleUpdateUser} />
        </Route>
        <Route exact path="/userprofile/:id">
          <UserProfile user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
