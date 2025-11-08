# Simple Book Management App
Modern CRUD aplikasi manajemen buku dibangun dengan FastAPI (backend) dan React + Vite + TailwindCSS (frontend).

## Fitur
- List semua buku
- Tambah buku baru
- Update data buku (partial update didukung; field yang kosong tidak ditimpa)
- Hapus buku
- Validasi dasar (panjang teks, rentang tahun)

## Struktur Proyek
```
backend/        # FastAPI + SQLModel (SQLite)
frontend/       # React + Vite + TailwindCSS UI
```

## Menjalankan Backend
Pastikan Python 3.11+ terpasang.

Install dependency (opsional buat virtualenv):
```powershell
cd backend
pip install -r requirements.txt
```

Jalankan server:
```powershell
python main.py
# atau
uvicorn main:app --reload --port 8000
```

## Menjalankan Frontend
```powershell
cd frontend
npm install
npm run dev
```
Frontend default di http://localhost:5173 dan backend di http://localhost:8000.

## TailwindCSS
Terintegrasi melalui `tailwind.config.js` dan `postcss.config.js`. Utility kustom ada di `src/index.css`.

## Endpoint REST (Backend)
| Method | Path                | Deskripsi              |
|--------|---------------------|------------------------|
| GET    | /books              | Ambil list buku        |
| POST   | /books              | Tambah buku baru       |
| GET    | /books/{id}         | Ambil detail buku      |
| PUT    | /books/{id}         | Update buku (partial)  |
| DELETE | /books/{id}         | Hapus buku             |

Endpoint legacy yang masih diterima sementara waktu:
`/books/create`, `/books/update/{id}` (GET & PUT), `/books/{id}/delete`.

## Model & Validasi
Lihat `backend/models.py`:
- BookCreate / BookUpdate terpisah dari Book (tabel) untuk validasi.

