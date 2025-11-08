from sqlmodel import Field, SQLModel
from typing import Optional


class BookBase(SQLModel):
    title: str = Field(min_length=1, max_length=200)
    year: int = Field(ge=0, le=3000, description="Publication year")
    author: str = Field(min_length=1, max_length=200)
    category: Optional[str] = Field(default=None, max_length=100)


class Book(BookBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class BookCreate(BookBase):
    pass


class BookUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    year: Optional[int] = Field(default=None, ge=0, le=3000)
    author: Optional[str] = Field(default=None, min_length=1, max_length=200)
    category: Optional[str] = Field(default=None, max_length=100)