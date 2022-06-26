package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "backend/db/bukukita2.db")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS users (
	id integer NOT NULL primary key AUTOINCREMENT,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	role varchar(255) NOT NULL,
	loggedin boolean NOT NULL
	);

	CREATE TABLE IF NOT EXISTS books (
		id integer NOT NULL primary key AUTOINCREMENT,
		judul varchar(255) NOT NULL,
		penerbit varchar(255) NOT NULL,
		tahun_terbit varchar(255) NOT NULL,
		jumlah_halaman varchar(255) NOT NULL,
		isbn varchar(255) NOT NULL,
		kategori varchar(255) NOT NULL,
		bahasa varchar(255) NOT NULL,
		berat integer NOT NULL,
		harga integer NOT NULL,
		kondisi varchar(255) NOT NULL,
		deskripsi varchar(255) NOT NULL,
		stok integer NOT NULL
	);

	INSERT INTO books(judul, penerbit, tahun_terbit, jumlah_halaman, isbn, kategori, bahasa, berat, harga, kondisi, deskripsi, stok) VALUES
    ('Bahasa Indonesia 1', 'Gramedia', '2005', '100', '978-200-8767', 'Buku Pelajaran', 'Indonesia', 100, 200, 'Baru', 'Buku Pelajaran Sekolah Dasar', 5),
	('Bahasa Inggris 2', 'Gramedia', '2015', '100', '978-200-9467', 'Buku Pelajaran', 'English', 100, 300, 'Baru', 'Buku Pelajaran Sekolah Pertama', 5),
	('Bahasa Indonesia 3', 'Erlangga', '2012', '100', '978-200-3767', 'Buku Pelajaran', 'Indonesia', 100, 400, 'Baru', 'Buku Pelajaran Sekolah Menengah', 5);
	
	`)

	if err != nil {
		panic(err)
	}
}
