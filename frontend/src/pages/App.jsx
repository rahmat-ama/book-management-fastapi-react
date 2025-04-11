import React from "react";
import '../App.css'
import BookList from '../components/Books';
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Management App</h1>
      </header>
      <main>
        <BookList />
        <div className="addButton">
          <Link to={"/books/create"}>
            Add Book Data
          </Link>
        </div>
      </main>
    </div>
  );
};

export default App;