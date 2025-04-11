import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlmodel import Session, select
from models import Book
from database import create_db_and_tables, get_session

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.on_event('startup')
def on_startup() :
    create_db_and_tables()

@app.get('/books', response_model=List[Book])
def read_books(session: Session = Depends(get_session)) :
    books = session.exec(select(Book)).all()
    return books

@app.post('/books/create', response_model=Book)
def save_book(book: Book, session : Session = Depends(get_session)) :
    session.add(book)
    session.commit()
    session.refresh(book)
    return book

@app.get('/books/update/{book_id}', response_model=Book)
def update_book_data(book_id: int, session: Session = Depends(get_session)) :
    book_data = session.get(Book, book_id)
    if not book_data :
        raise HTTPException(status_code=404, detail="Data Buku tidak ditemukan")
    
    return book_data

@app.put('/books/update/{book_id}', response_model=Book)
def update_book(book_id: int, book_update: Book, session: Session = Depends(get_session)) :
    book_data = session.get(Book, book_id)
    if not book_data :
        raise HTTPException(status_code=404, detail="Data Buku tidak ditemukan")
    
    # Update field
    book_data.title = book_update.title
    book_data.year = book_update.year
    book_data.author = book_update.author
    book_data.category = book_update.category

    # Save update
    session.add(book_data)
    session.commit()
    session.refresh(book_data)

    return book_data

@app.delete('/books/{book_id}/delete', response_model=dict)
def delete_book(book_id: int, session: Session = Depends(get_session)) :
    book_data = session.get(Book, book_id)
    if not book_data :
        raise HTTPException(status_code=404, detail="Data Buku tidak ditemukan")
    
    # Delete data
    session.delete(book_data)
    session.commit()

    return {"message":f'Buku dengan ID {book_id} telah dihapus'}

if __name__ == "__main__" :
    uvicorn.run(app)