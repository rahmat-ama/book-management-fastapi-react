import React, {useEffect, useState} from "react";
import api from "../api";
import { Link } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const fetchBooks = async () => {
        try {
            const response = await api.get('/books');
            setBooks(response.data);
        }
        catch (error) {
            console.error("Error fetching books", error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, [])

    return (
        <div>
            <h2>Books List</h2>
            <div className="Book_table">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.category}</td>
                                <td><Link to={`/books/update/${book.id}`}> Edit </Link>
                                     | 
                                    <Link to={`/books/${book.id}/delete`}> Delete </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;