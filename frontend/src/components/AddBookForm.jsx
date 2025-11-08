import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        year: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/books", {
                title: formData.title,
                author: formData.author,
                year: Number(formData.year),
                category: formData.category,
            });
            navigate("/books");
        } catch (error) {
            console.error("Gagal menambahkan buku", error);
        }
    };

    return (
        <div className="card max-w-xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Tambah Buku Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Judul
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Masukkan judul"
                        required
                        autoFocus
                        className="input-field mt-1"
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Penulis
                    </label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Masukkan penulis"
                        required
                        className="input-field mt-1"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                            Tahun
                        </label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="2024"
                            required
                            className="input-field mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Kategori
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Kategori"
                            required
                            className="input-field mt-1"
                        />
                    </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                    <button type="submit" className="btn-primary">
                        Simpan
                    </button>
                    <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;