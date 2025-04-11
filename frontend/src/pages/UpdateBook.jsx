import UpdateBookForm from "../components/UpdateBookForms";
import { Link } from "react-router-dom";

const UpdateBook = () => {
    return (
        <div>
            <h1>Ubah Data Buku</h1>
            <UpdateBookForm />
            <div style={{ marginTop: '1em' }}>
                <Link to={'/books'}>Back to Home</Link>
            </div>
        </div>
    );
};

export default UpdateBook;