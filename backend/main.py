import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlmodel import Session, select
from models import Book, BookCreate, BookUpdate
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
def read_books(session: Session = Depends(get_session)):
    return session.exec(select(Book)).all()


# Create - support both /books and legacy /books/create
@app.post('/books', response_model=Book)
@app.post('/books/create', response_model=Book)
def create_book(book_in: BookCreate, session: Session = Depends(get_session)):
    book = Book.model_validate(book_in)
    session.add(book)
    session.commit()
    session.refresh(book)
    return book


# Read one - support both /books/{id} and legacy GET /books/update/{id}
@app.get('/books/{book_id}', response_model=Book)
@app.get('/books/update/{book_id}', response_model=Book)
def get_book(book_id: int, session: Session = Depends(get_session)):
    book_data = session.get(Book, book_id)
    if not book_data:
        raise HTTPException(status_code=404, detail="Data Buku tidak ditemukan")
    return book_data


# Update - support both /books/{id} and legacy PUT /books/update/{id}
@app.put('/books/{book_id}', response_model=Book)
@app.put('/books/update/{book_id}', response_model=Book)
def update_book(book_id: int, book_update: BookUpdate, session: Session = Depends(get_session)):
    book_data = session.get(Book, book_id)
    if not book_data:
        raise HTTPException(status_code=404, detail="Data Buku tidak ditemukan")

    update_data = book_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(book_data, key, value)

    session.add(book_data)
    session.commit()
    session.refresh(book_data)
    return book_data


# Delete - support both /books/{id} and legacy /books/{id}/delete
@app.delete('/books/{book_id}', response_model=dict)
@app.delete('/books/{book_id}/delete', response_model=dict)
def delete_book(book_id: int, session: Session = Depends(get_session)):
    book_data = session.get(Book, book_id)
    if not book_data:
        raise HTTPException(status_code=404, detail="Data Buku tidak ditemukan")

    session.delete(book_data)
    session.commit()
    return {"message": f'Buku dengan ID {book_id} telah dihapus'}

if __name__ == "__main__" :
    uvicorn.run(app)