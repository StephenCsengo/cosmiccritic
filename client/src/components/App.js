import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import Home from "./Home.js";
import BookList from "./BookList.js";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <div className="app">
      <NavBar />

      <Switch>
        <Route path="/booklist">
          <BookList books={books} />
        </Route>
        <Route exact path="/">
          <Home books={books} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
