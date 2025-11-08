import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useEffect } from "react";

const DeleteBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const deleteBook = async () => {
            try {
                await api.delete(`/books/${id}`);
                navigate("/books");
            }
            catch (error) {
                console.error('Error menghapus buku', error);
            }
        };

        deleteBook();
    }, [id, navigate]);


    return null;
};

export default DeleteBook;