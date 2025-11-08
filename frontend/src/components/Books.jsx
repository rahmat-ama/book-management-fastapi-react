import React, { useEffect, useState } from "react";
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
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Daftar Buku</h2>
                <Link to="/books/create" className="btn-primary">Tambah Buku</Link>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="table-base">
                    <thead className="table-head-row">
                        <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Penulis</th>
                            <th>Tahun</th>
                            <th>Kategori</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {books.map(book => (
                            <tr key={book.id} className="table-body-row">
                                <td className="font-medium">{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.category ? <span className="badge">{book.category}</span> : '-'}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link to={`/books/update/${book.id}`} className="btn-secondary">Edit</Link>
                                        <Link to={`/books/${book.id}/delete`} className="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500">Hapus</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default BookList;