import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App.jsx';
import CreateBook from './pages/CreateBook.jsx';
import UpdateBook from './pages/UpdateBook.jsx';
import DeleteBook from './components/DeleteBook.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/books',
    element: <App />,
  },
  {
    path: '/books/create',
    element: <CreateBook />
  },
  {
    path: '/books/update/:bookId',
    element: <UpdateBook />
  },
  {
    path: '/books/:id/delete',
    element: <DeleteBook />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
