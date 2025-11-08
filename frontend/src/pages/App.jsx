import React from "react";
import BookList from "../components/Books";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Book Management</h1>
          <p className="text-sm text-gray-500">Kelola koleksi buku Anda dengan mudah</p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <BookList />
      </main>
    </div>
  );
};

export default App;