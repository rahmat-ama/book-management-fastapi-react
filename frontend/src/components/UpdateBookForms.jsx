import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBookForm = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        category: ''
    });

    const fetchBook = async () => {
        try {
            const response = await api.get(`/books/update/${bookId}`);
            setFormData({
                title: response.data.title,
                author: response.data.author,
                year: response.data.year,
                category: response.data.category
            });
        }
        catch (error) {
            console.error('Data buku tidak ditemukan', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/books/update/${bookId}`, formData);
            navigate("/books");
        }
        catch (error) {
            console.error("Error menambahkan data buku", error);
        }
    };
    useEffect(() => {
        fetchBook();
    }, [bookId]);

    return (
        <form onSubmit={handleSubmit} className="addform">
            <label htmlFor="title">Title</label><br />
            <input type="text"
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   placeholder="Enter book title"
                   required />
                   <br />
            <label htmlFor="author">Author</label><br />
            <input type="text"
                   name="author"
                   value={formData.author}
                   onChange={handleChange}
                   placeholder="Enter book author"
                   required />
                   <br />
            <label htmlFor="year">Year</label><br />
            <input type="number"
                   name="year"
                   value={formData.year}
                   onChange={handleChange}
                   placeholder="Enter book year"
                   required />
                   <br />
            <label htmlFor="category">Category</label><br />
            <input type="text"
                   name="category"
                   value={formData.category}
                   onChange={handleChange}
                   placeholder="Enter book category"
                   required />
                   <br />
            <button type="submit">Save Update</button>
        </form>
    )
}

export default UpdateBookForm;