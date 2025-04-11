import AddBookForm from '../components/AddBookForm';
import { Link } from 'react-router-dom';

const CreateBook = () => {
    return (
        <div>
            <h1>Tambah Data Buku</h1>
            <div>
                <AddBookForm />
                <Link to={'/books'}>Back to Home</Link>
            </div>
        </div>
    );
};

export default CreateBook;