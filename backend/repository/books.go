package repository

import (
	"database/sql"
	"strconv"
)

type BookRepository struct {
	db *sql.DB
}

func NewBookRepository(db *sql.DB) *BookRepository {
	return &BookRepository{db: db}
}

func (u *BookRepository) LoadOrCreate() ([]Book, error) {
	records, err := u.db.Load("books")
	if err != nil {
		records = [][]string{
			{"penulis", "judul", "harga"},
		}
		if err := u.db.Save("book", records); err != nil {
			return nil, err
		}
	}

	result := make([]Book, 0)
	for i := 1; i < len(records); i++ {
		harga, err := strconv.Atoi(records[i][2])
		if err != nil {
			return nil, err
		}

		user := Book{
			Penulis: records[i][0],
			Judul:   records[i][1],
			Harga:   harga,
		}
		result = append(result, user)
	}

	return result, nil

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

func (u *BookRepository) SelectAll() ([]Book, error) {
	bookItems, err := u.LoadOrCreate()
	if err != nil {
		return nil, err
	}
	return bookItems, nil
}
