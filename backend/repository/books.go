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

func (u *BookRepository) CreateBook(Book, error) (int64, error) {

	var sqlStatement string

	sqlStatement = "insert into books (judul, penerbit, tahun_terbit, jumlah_halaman, isbn, kategori, bahasa, berat, harga, kondisi, deskripsi, stok values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

	books, err := u.db.Query(sqlStatement)

	if err != nil {
		return 0, err
	}

	return books, nil
}

func (u *BookRepository) FetchBookByID(id int64) (Book, error) {

	var book Book
	var sqlStatement string

	sqlStatement = "SELECT * FROM books WHERE id = ?"

	row, err := u.db.Query(sqlStatement, id)

	if err != nil {
		return book, err
	}

	defer row.Close()

	for row.Next() {
		if err := row.Scan(&book.ID, &book.Judul, &book.Penerbit, &book.TahunTerbit, &book.JumlahHalaman, &book.ISBN, &book.Kategori, &book.Bahasa, &book.Berat, &book.Harga, &book.Kondisi, &book.Deskripsi, &book.Stok); err != nil {
			return book, err
		}
	}
	return book, nil

}

func (u *BookRepository) FetchBookByJudul(judul string) (Book, error) {

	var book Book
	var sqlStatement string

	sqlStatement = "SELECT * FROM books WHERE judul = ?"

	row := u.db.QueryRow(sqlStatement, judul)

	err := row.Scan(&book.ID, &book.Judul, &book.Penerbit, &book.TahunTerbit, &book.JumlahHalaman, &book.ISBN, &book.Kategori, &book.Bahasa, &book.Berat, &book.Harga, &book.Kondisi, &book.Deskripsi, &book.Stok)

	if err != nil {
		return book, err
	}

	return book, nil

}

func (u *BookRepository) FetchBooks() ([]Book, error) {

	var books []Book
	var sqlStatement string

	sqlStatement = "SELECT * FROM books"

	rows, err := u.db.Query(sqlStatement)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var book Book
		if err := rows.Scan(&book.ID, &book.Judul, &book.Penerbit, &book.TahunTerbit, &book.JumlahHalaman, &book.ISBN, &book.Kategori, &book.Bahasa, &book.Berat, &book.Harga, &book.Kondisi, &book.Deskripsi, &book.Stok); err != nil {
			return nil, err
		}
		books = append(books, book)
	}
	return books, nil
}
