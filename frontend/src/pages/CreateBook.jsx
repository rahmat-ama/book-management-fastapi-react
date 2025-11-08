import AddBookForm from '../components/AddBookForm';
import { Link } from 'react-router-dom';

const CreateBook = () => {
    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Tambah Data Buku</h1>
                <Link to={'/books'} className="btn-secondary">Kembali</Link>
            </div>
            <AddBookForm />
        </div>
    );
};

export default CreateBook;