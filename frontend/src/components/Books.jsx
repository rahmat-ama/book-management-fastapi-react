import React, {useEffect, useState} from "react";
import api from "../api";
import AddBookForm from "./AddBookForm";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const fetchBooks = async () => {
        try {
            const response = await api.get('/books');
            console.log(response)
            setBooks(response.data);
        }
        catch (error) {
            console.error("Error fetching books", error);
        }
    };
    const addBook = async (bookData) => {
        try {
            await api.post('/books', bookData);
            fetchBooks();
        }
        catch (error) {
            console.error('Error adding book', error)
        }
    };
    useEffect(() => {
        fetchBooks();
    }, [])

    return (
        <div>
            <h2>Books List</h2>
            <div className="Book_table">
                <table border={2}>
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
                            <tr>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.category}</td>
                                <td>Edit | Delete</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddBookForm addBook={addBook}/>
        </div>
    );
};

export default BookList;