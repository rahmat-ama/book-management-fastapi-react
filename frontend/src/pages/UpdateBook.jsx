import UpdateBookForm from "../components/UpdateBookForms";
import { Link } from "react-router-dom";

const UpdateBook = () => {
    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Ubah Data Buku</h1>
                <Link to={'/books'} className="btn-secondary">Kembali</Link>
            </div>
            <UpdateBookForm />
        </div>
    );
};

export default UpdateBook;