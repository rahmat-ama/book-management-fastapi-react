import React, {useState} from "react";

const AddBookForm = ({ addBook }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        category: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.title && formData.author && formData.category && formData.year) {
            addBook(formData);
            setFormData({ title:'', author:'', year:'', category:''});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   placeholder="Enter book title"
                   required />
                   <br />
            <input type="text"
                   name="author"
                   value={formData.author}
                   onChange={handleChange}
                   placeholder="Enter book author"
                   required />
                   <br />
            <input type="number"
                   name="year"
                   value={formData.year}
                   onChange={handleChange}
                   placeholder="Enter book year"
                   required />
                   <br />
            <input type="text"
                   name="category"
                   value={formData.category}
                   onChange={handleChange}
                   placeholder="Enter book category"
                   required />
                   <br />
            <button type="submit">Add Book</button>
        </form>
    )
};

export default AddBookForm;