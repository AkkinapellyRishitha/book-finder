import { useState } from "react";
import BookCard from "./BookCard";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs.slice(0, 10)); // first 10 results
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>📚 Book Finder</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="book-list">
        {books.map((book, idx) => (
          <BookCard key={idx} book={book} />
        ))}
      </div>
    </div>
  );
}
