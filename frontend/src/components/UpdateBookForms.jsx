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

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await api.get(`/books/${bookId}`);
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
        fetchBook();
    }, [bookId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/books/${bookId}`, {
                ...formData,
                year: Number(formData.year),
            });
            navigate("/books");
        }
        catch (error) {
            console.error("Error menyimpan perubahan buku", error);
        }
    };

    return (
        <div className="card max-w-xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Ubah Data Buku</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Masukkan judul" required className="input-field mt-1" />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Penulis</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Masukkan penulis" required className="input-field mt-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Tahun</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2024" required className="input-field mt-1" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Kategori" required className="input-field mt-1" />
                    </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                    <button type="submit" className="btn-primary">Simpan Perubahan</button>
                    <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Batal</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateBookForm;