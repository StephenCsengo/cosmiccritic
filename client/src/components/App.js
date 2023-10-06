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
  const [user, setUser] = useState({ id: 1 });
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const fetchUser = () => {
    fetch("/checksession").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      } else {
        response.json().then((errors) => setErrors(errors));
      }
    });
  };
  const fetchUserReviews = () =>
    fetch(`/users/${user.id}/reviews`).then((response) => {
      if (response.ok) {
        response.json().then((data) => setUserReviews(data));
      } else {
        response.json().then((errors) => setErrors(errors));
      }
    });
  //Fetch user and list of books
  useEffect(() => {
    fetchUser();
    fetchUserReviews();
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
  };
  console.log("From app: ", user);
  console.log("From app: ", userReviews);
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
        <Route exact path="/userprofile/">
          <UserProfile user={user} userReviews={userReviews} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
