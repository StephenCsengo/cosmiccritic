import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import Home from "./Home.js";
import BookList from "./BookList.js";
import BookDetails from "./BookDetails.js";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import UserProfile from "./UserProfile.js";
import EditReview from "./EditReview.js";

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

  //Fetch user and list of books
  useEffect(() => {
    fetchUser();
    fetch("/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  const handleUpdateUser = (user) => {
    setUser(user);
  };

  return (
    <div className="app">
      <NavBar user={user} updateUser={handleUpdateUser} />

      <Switch>
        <Route path="/booklist">
          <BookList books={books} />
        </Route>
        <Route exact path="/">
          <Home books={books} user={user} />
        </Route>
        <Route exact path="/bookdetails/:id">
          <BookDetails user={user} />
        </Route>
        <Route exact path="/signup">
          <SignUp books={books} updateUser={handleUpdateUser} />
        </Route>
        <Route exact path="/loginform">
          <Login books={books} updateUser={handleUpdateUser} />
        </Route>
        <Route exact path="/userprofile/">
          <UserProfile user={user} />
        </Route>
        <Route exact path="/editreview/:id">
          <EditReview user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
