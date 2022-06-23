package repository

import (
	"database/sql"
)

type BookRepository struct {
	db *sql.DB
}

func NewBookRepository(db *sql.DB) *BookRepository {
	return &BookRepository{db: db}
}

func (u *BookRepository) FetchBooks() ([]Book, error) {
	books, stmt := []Book{}, `SELECT id, judul, penerbit, tahun_terbit, jumlah_halaman, isbn, kategori, bahasa, berat, harga, kondisi, deskripsi, stok`

	rows, err := u.db.Query(stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		var book Book
		err = rows.Scan(
			&book.ID,
			&book.Judul,
			&book.Penerbit,
			&book.TahunTerbit,
			&book.JumlahHalaman,
			&book.ISBN,
			&book.Kategori,
			&book.Bahasa,
			&book.Berat,
			&book.Harga,
			&book.Kondisi,
			&book.Deskripsi,
			&book.Stok,
		)

		if err != nil {
			return nil, err
		}

		books = append(books, book)
	}
	return books, nil
}
